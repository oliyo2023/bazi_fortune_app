-- Create custom types
create type public.user_role as enum ('user', 'master', 'admin');
create type public.order_status as enum ('pending', 'paid', 'cancelled', 'refunded');
create type public.payment_method as enum ('alipay', 'wechat');
create type public.message_sender as enum ('user', 'master', 'deepseek');

-- USERS table (extends auth.users)
-- This table is for public user data. Private data is in auth.users.
-- We'll use a trigger to create a user profile when a new user signs up.
create table public.users (
    id uuid not null references auth.users on delete cascade,
    role public.user_role not null default 'user',
    created_at timestamptz default timezone('utc'::text, now()) not null,
    
    primary key (id)
);
-- Function to create a public profile for a new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, role)
  values (new.id, 'user');
  return new;
end;
$$;
-- Trigger to call the function
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- MASTERS table
create table public.masters (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null references public.users on delete cascade,
    name text,
    specialty text,
    price_per_msg decimal(10, 2) not null default 0.00,
    is_verified boolean not null default false,
    invite_code text,
    bio text,
    avatar_url text,
    created_at timestamptz default timezone('utc'::text, now()) not null,

    primary key (id),
    unique(user_id),
    unique(invite_code)
);

-- ORDERS table
create table public.orders (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null references public.users on delete cascade,
    master_id uuid not null references public.masters on delete cascade,
    amount decimal(10, 2) not null,
    status public.order_status not null default 'pending',
    payment_method public.payment_method,
    transaction_id text,
    platform_fee decimal(10, 2),
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null,

    primary key (id)
);

-- CHATS table
create table public.chats (
    id uuid not null default gen_random_uuid(),
    order_id uuid references public.orders on delete set null,
    user_id uuid not null references public.users on delete cascade,
    master_id uuid references public.masters on delete cascade,
    bazi_input jsonb,
    is_trial boolean not null default false,
    message_count integer not null default 0,
    created_at timestamptz default timezone('utc'::text, now()) not null,

    primary key (id)
);

-- MESSAGES table
create table public.messages (
    id uuid not null default gen_random_uuid(),
    chat_id uuid not null references public.chats on delete cascade,
    sender public.message_sender not null,
    content text not null,
    timestamp timestamptz default timezone('utc'::text, now()) not null,

    primary key (id)
);

-- EARNINGS table
create table public.earnings (
    id uuid not null default gen_random_uuid(),
    master_id uuid not null references public.masters on delete cascade,
    order_id uuid not null references public.orders on delete cascade,
    amount decimal(10, 2) not null,
    platform_fee decimal(10, 2) not null,
    paid_out boolean not null default false,
    created_at timestamptz default timezone('utc'::text, now()) not null,

    primary key (id),
    unique(order_id)
);