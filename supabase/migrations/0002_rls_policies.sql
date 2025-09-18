-- Enable RLS for all tables
alter table public.users enable row level security;
alter table public.masters enable row level security;
alter table public.orders enable row level security;
alter table public.chats enable row level security;
alter table public.messages enable row level security;
alter table public.earnings enable row level security;

-- Helper function to get user role
create or replace function public.get_my_role()
returns text
language sql stable
as $$
  select role from public.users where id = auth.uid()
$$;

-- USERS table policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Admins can view all user profiles"
  on public.users for select
  using (public.get_my_role() = 'admin');

-- MASTERS table policies
create policy "Anyone can view verified masters"
  on public.masters for select
  using (is_verified = true);

create policy "Masters can view and edit their own profile"
  on public.masters for all
  using (auth.uid() = user_id);

create policy "Admins can do anything"
  on public.masters for all
  using (public.get_my_role() = 'admin');

-- ORDERS table policies
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Masters can view orders assigned to them"
  on public.orders for select
  using (auth.uid() = master_id);

create policy "Admins can do anything"
  on public.orders for all
  using (public.get_my_role() = 'admin');

-- CHATS and MESSAGES table policies
create policy "Chat participants can view and create messages"
  on public.chats for all
  using (
    (auth.uid() = user_id) or
    (auth.uid() = master_id)
  );

create policy "Message participants can view and create messages"
  on public.messages for all
  using (
    chat_id in (
      select id from public.chats
      where (auth.uid() = user_id) or (auth.uid() = master_id)
    )
  );

create policy "Admins can view all chats and messages"
  on public.chats for select using (public.get_my_role() = 'admin');
  
create policy "Admins can view all messages"
  on public.messages for select using (public.get_my_role() = 'admin');


-- EARNINGS table policies
create policy "Masters can view their own earnings"
  on public.earnings for select
  using (auth.uid() = master_id);

create policy "Admins can do anything"
  on public.earnings for all
  using (public.get_my_role() = 'admin');