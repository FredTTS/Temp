-- Tabell för att logga rumstemperaturer
create table if not exists public.temperature_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  room_name text not null,
  temperature numeric not null,
  logged_date date not null,
  created_at timestamptz default now(),
  unique(user_id, room_name, logged_date)
);

-- RLS: användare ser och skapar bara egna rader
alter table public.temperature_logs enable row level security;

create policy "Users can read own logs"
  on public.temperature_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own logs"
  on public.temperature_logs for insert
  with check (auth.uid() = user_id);
