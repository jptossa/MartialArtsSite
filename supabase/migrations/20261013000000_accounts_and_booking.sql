-- Accounts + weekly class booking.
--
-- Martial arts still live in code (src/lib/mock-data), so class_templates
-- reference an art by slug with no foreign key. Add one when arts move into
-- the database.
--
-- Bookings are written ONLY through book_class() / cancel_booking(): clients
-- have no INSERT/UPDATE/DELETE on the table, so capacity, weekday, window and
-- cutoff rules cannot be bypassed.

-- ---------------------------------------------------------------- types ----
create type public.user_role as enum ('member', 'instructor', 'admin');
create type public.class_level as enum ('beginner', 'intermediate', 'advanced', 'all');
create type public.booking_status as enum ('booked', 'cancelled');

-- ------------------------------------------------------------- profiles ----
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  phone text,
  role public.user_role not null default 'member',
  created_at timestamptz not null default now()
);

-- Every new auth user gets a profile; the name comes from signup metadata.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- security definer so policies on profiles/class_templates can check the role
-- without recursing into profiles' own RLS.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

-- ------------------------------------------------------ class_templates ----
-- One row per weekly slot, e.g. "Muay Thai, Tuesdays 18:00, 12 seats".
create table public.class_templates (
  id uuid primary key default gen_random_uuid(),
  art_slug text not null,
  weekday smallint not null check (weekday between 0 and 6), -- 0 = Sunday, like extract(dow)
  start_time time not null,
  duration_minutes integer not null check (duration_minutes between 15 and 240),
  instructor_id uuid references public.profiles (id) on delete set null,
  location text not null default 'Main studio',
  capacity integer not null check (capacity > 0),
  level public.class_level not null default 'all',
  timezone text not null default 'America/Los_Angeles',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index class_templates_art_idx on public.class_templates (art_slug) where active;

-- -------------------------------------------------------------- bookings ----
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  -- restrict: a slot with bookings is deactivated, never deleted.
  template_id uuid not null references public.class_templates (id) on delete restrict,
  class_date date not null,
  status public.booking_status not null default 'booked',
  created_at timestamptz not null default now(),
  cancelled_at timestamptz,
  unique (user_id, template_id, class_date)
);

create index bookings_slot_idx on public.bookings (template_id, class_date) where status = 'booked';
create index bookings_user_idx on public.bookings (user_id, class_date);

-- ------------------------------------------------------------------ RLS ----
alter table public.profiles enable row level security;
alter table public.class_templates enable row level security;
alter table public.bookings enable row level security;

create policy "profiles: read own or admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());

create policy "profiles: update own" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Table privileges. Newer Supabase projects do not auto-grant new tables to
-- the API roles, so grant exactly what is needed; RLS then narrows it per row.
-- Members may only change their name and phone; promoting a role is done by an
-- admin in the SQL editor.
revoke all on public.profiles from authenticated, anon;
grant select on public.profiles to authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

create policy "templates: public read active" on public.class_templates
  for select to anon, authenticated
  using (active or public.is_admin() or instructor_id = (select auth.uid()));

create policy "templates: admin write" on public.class_templates
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "bookings: read own or admin" on public.bookings
  for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

-- Bookings are read-only for clients; writes go through book_class() /
-- cancel_booking().
revoke all on public.bookings from authenticated, anon;
grant select on public.bookings to authenticated;

-- Everyone can read the timetable; only admins (by RLS) can change it.
revoke all on public.class_templates from authenticated, anon;
grant select on public.class_templates to anon, authenticated;
grant insert, update on public.class_templates to authenticated;

-- ------------------------------------------------------------ functions ----
-- Errors are raised as short codes; the app maps them to messages.

create function public.book_class(p_template_id uuid, p_class_date date)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := (select auth.uid());
  t public.class_templates%rowtype;
  v_start timestamptz;
  v_end timestamptz;
  v_booked integer;
  v_existing public.booking_status;
  v_id uuid;
begin
  if v_user is null then
    raise exception 'not_authenticated';
  end if;

  -- Row lock serializes concurrent bookings of the same slot, so the capacity
  -- check below cannot be raced past.
  select * into t from public.class_templates
  where id = p_template_id and active
  for update;
  if not found then
    raise exception 'class_not_found';
  end if;

  if extract(dow from p_class_date)::integer <> t.weekday then
    raise exception 'wrong_weekday';
  end if;

  v_start := (p_class_date + t.start_time) at time zone t.timezone;
  v_end := v_start + make_interval(mins => t.duration_minutes);

  if v_start <= now() then
    raise exception 'class_started';
  end if;
  if p_class_date > (now() at time zone t.timezone)::date + 28 then
    raise exception 'outside_window';
  end if;

  select status into v_existing from public.bookings
  where user_id = v_user and template_id = t.id and class_date = p_class_date;
  if v_existing = 'booked' then
    raise exception 'already_booked';
  end if;

  select count(*) into v_booked from public.bookings
  where template_id = t.id and class_date = p_class_date and status = 'booked';
  if v_booked >= t.capacity then
    raise exception 'class_full';
  end if;

  -- No double-booking overlapping sessions.
  if exists (
    select 1
    from public.bookings b
    join public.class_templates t2 on t2.id = b.template_id
    where b.user_id = v_user
      and b.status = 'booked'
      and b.class_date between p_class_date - 1 and p_class_date + 1
      and ((b.class_date + t2.start_time) at time zone t2.timezone) < v_end
      and ((b.class_date + t2.start_time) at time zone t2.timezone)
          + make_interval(mins => t2.duration_minutes) > v_start
  ) then
    raise exception 'overlap';
  end if;

  -- Cap on upcoming bookings per person (cheap abuse limit).
  if (
    select count(*)
    from public.bookings b
    join public.class_templates t2 on t2.id = b.template_id
    where b.user_id = v_user
      and b.status = 'booked'
      and ((b.class_date + t2.start_time) at time zone t2.timezone) > now()
  ) >= 10 then
    raise exception 'too_many_bookings';
  end if;

  -- A cancelled row for the same slot is reactivated (unique constraint).
  insert into public.bookings (user_id, template_id, class_date)
  values (v_user, t.id, p_class_date)
  on conflict (user_id, template_id, class_date)
  do update set status = 'booked', cancelled_at = null, created_at = now()
  returning id into v_id;

  return v_id;
end;
$$;

create function public.cancel_booking(p_booking_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := (select auth.uid());
  v_start timestamptz;
begin
  if v_user is null then
    raise exception 'not_authenticated';
  end if;

  select ((b.class_date + t.start_time) at time zone t.timezone) into v_start
  from public.bookings b
  join public.class_templates t on t.id = b.template_id
  where b.id = p_booking_id and b.user_id = v_user and b.status = 'booked'
  for update of b;
  if not found then
    raise exception 'booking_not_found';
  end if;

  -- Cutoff: 2 hours before the start.
  if v_start - interval '2 hours' <= now() then
    raise exception 'cancel_too_late';
  end if;

  update public.bookings
  set status = 'cancelled', cancelled_at = now()
  where id = p_booking_id;
end;
$$;

-- Upcoming occurrences of an art's weekly slots with live seat counts.
-- Members cannot read other people's bookings, so the counts come from here.
create function public.get_schedule(p_art_slug text, p_from date, p_to date)
returns table (
  template_id uuid,
  class_date date,
  starts_at timestamptz,
  timezone text,
  duration_minutes integer,
  location text,
  level public.class_level,
  capacity integer,
  booked_count integer,
  spots_left integer,
  instructor_name text,
  my_booking_id uuid
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    t.id,
    x.d,
    (x.d + t.start_time) at time zone t.timezone,
    t.timezone,
    t.duration_minutes,
    t.location,
    t.level,
    t.capacity,
    c.booked,
    greatest(t.capacity - c.booked, 0),
    nullif(i.full_name, ''),
    (
      select b.id from public.bookings b
      where b.template_id = t.id and b.class_date = x.d
        and b.user_id = (select auth.uid()) and b.status = 'booked'
    )
  from public.class_templates t
  cross join generate_series(0, least(greatest(p_to - p_from, 0), 60)) as g
  cross join lateral (select p_from + g as d) x
  left join public.profiles i on i.id = t.instructor_id
  cross join lateral (
    select count(*)::integer as booked from public.bookings b
    where b.template_id = t.id and b.class_date = x.d and b.status = 'booked'
  ) c
  where t.active
    and t.art_slug = p_art_slug
    and extract(dow from x.d)::integer = t.weekday
    and (x.d + t.start_time) at time zone t.timezone > now()
  order by 3;
$$;

create function public.get_my_bookings()
returns table (
  booking_id uuid,
  art_slug text,
  class_date date,
  starts_at timestamptz,
  timezone text,
  duration_minutes integer,
  location text,
  status public.booking_status
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    b.id,
    t.art_slug,
    b.class_date,
    (b.class_date + t.start_time) at time zone t.timezone,
    t.timezone,
    t.duration_minutes,
    t.location,
    b.status
  from public.bookings b
  join public.class_templates t on t.id = b.template_id
  where b.user_id = (select auth.uid())
  order by 4 desc;
$$;

-- Names/phones of booked members for one session. Admins, or the slot's own
-- instructor.
create function public.get_roster(p_template_id uuid, p_class_date date)
returns table (
  booking_id uuid,
  full_name text,
  phone text,
  booked_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select b.id, p.full_name, p.phone, b.created_at
  from public.bookings b
  join public.profiles p on p.id = b.user_id
  join public.class_templates t on t.id = b.template_id
  where b.template_id = p_template_id
    and b.class_date = p_class_date
    and b.status = 'booked'
    and (public.is_admin() or t.instructor_id = (select auth.uid()))
  order by b.created_at;
$$;

-- Functions default to EXECUTE for PUBLIC; lock them down explicitly.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.is_admin() from public;
revoke execute on function public.book_class(uuid, date) from public, anon;
revoke execute on function public.cancel_booking(uuid) from public, anon;
revoke execute on function public.get_schedule(text, date, date) from public;
revoke execute on function public.get_my_bookings() from public, anon;
revoke execute on function public.get_roster(uuid, date) from public, anon;

-- anon needs it too: the public read policy on class_templates calls it
-- (it simply returns false for logged-out visitors).
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.book_class(uuid, date) to authenticated;
grant execute on function public.cancel_booking(uuid) to authenticated;
grant execute on function public.get_schedule(text, date, date) to anon, authenticated;
grant execute on function public.get_my_bookings() to authenticated;
grant execute on function public.get_roster(uuid, date) to authenticated;
