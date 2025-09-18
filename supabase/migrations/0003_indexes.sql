-- Indexes for performance

-- MASTERS table
-- For filtering verified masters and by specialty
create index idx_masters_verified_specialty on public.masters (is_verified, specialty);

-- ORDERS table
-- For querying user's orders by status and date
create index idx_orders_user_status on public.orders (user_id, status, created_at desc);
-- For querying master's orders
create index idx_orders_master_id on public.orders (master_id);

-- CHATS table
-- For finding trial chats and chats related to an order
create index idx_chats_order_trial on public.chats (order_id, is_trial);
create index idx_chats_user_master on public.chats (user_id, master_id);

-- MESSAGES table
-- For loading messages in a chat ordered by time
create index idx_messages_chat_timestamp on public.messages (chat_id, timestamp desc);

-- EARNINGS table
-- For querying master's earnings
create index idx_earnings_master_id on public.earnings (master_id);