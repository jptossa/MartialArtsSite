-- Daily budget for the chatbot's escalation to the larger (Sonnet) model.
--
-- One row per day with a use counter. The table has no client access at all;
-- the only way to spend budget is claim_sonnet_slot(), which increments the
-- counter and returns true only while today's count is under the limit. The
-- upsert is a single statement, so concurrent callers cannot overshoot.
--
-- The limit lives here (single source of truth). To change it, ship a new
-- migration with `create or replace function`. "Today" is Pacific time, the
-- same zone class times use.

create table public.chat_sonnet_usage (
  day date primary key,
  uses integer not null default 0 check (uses >= 0)
);

alter table public.chat_sonnet_usage enable row level security;
revoke all on public.chat_sonnet_usage from authenticated, anon;

create function public.claim_sonnet_slot()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  daily_limit constant integer := 10;
  today date := (now() at time zone 'America/Los_Angeles')::date;
  claimed integer;
begin
  insert into public.chat_sonnet_usage as u (day, uses)
  values (today, 1)
  on conflict (day) do update
    set uses = u.uses + 1
    where u.uses < daily_limit
  returning u.uses into claimed;

  -- No row returned: the conflict branch's WHERE failed, i.e. limit reached.
  return claimed is not null;
end;
$$;

-- The chat route calls this with the anon key (no login needed).
revoke execute on function public.claim_sonnet_slot() from public;
grant execute on function public.claim_sonnet_slot() to anon, authenticated;
