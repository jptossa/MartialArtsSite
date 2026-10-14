-- Fictional dev timetable (weekday: 0 = Sunday ... 6 = Saturday).
-- Replace with the real schedule when the studio provides one.
insert into public.class_templates
  (art_slug, weekday, start_time, duration_minutes, location, capacity, level)
values
  ('muay-thai',              2, '18:00', 60, 'Main studio', 12, 'all'),
  ('muay-thai',              4, '18:00', 60, 'Main studio', 12, 'beginner'),
  ('brazilian-jiu-jitsu',    1, '19:00', 75, 'Mat room',    14, 'all'),
  ('brazilian-jiu-jitsu',    3, '19:00', 75, 'Mat room',    14, 'intermediate'),
  ('krav-maga',              2, '19:30', 60, 'Main studio', 16, 'beginner'),
  ('boxing',                 1, '17:30', 60, 'Main studio', 10, 'all'),
  ('boxing',                 5, '17:30', 60, 'Main studio', 10, 'beginner'),
  ('judo',                   3, '18:00', 90, 'Mat room',    12, 'all'),
  ('karate',                 6, '10:00', 60, 'Main studio', 15, 'beginner'),
  ('taekwondo',              6, '11:15', 60, 'Main studio', 15, 'all'),
  ('wrestling',              4, '19:00', 75, 'Mat room',    12, 'intermediate'),
  ('wing-chun',              0, '10:00', 60, 'Main studio', 10, 'all'),
  ('aikido',                 0, '11:30', 60, 'Mat room',    10, 'beginner');
