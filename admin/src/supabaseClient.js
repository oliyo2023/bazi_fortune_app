import { createClient } from '@supabase/supabase-js';

// 从 .env 文件中获取 Supabase 的 URL 和 anon key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// 创建单一的 Supabase 客户端实例（单例模式）
// 这确保整个应用中只有一个 GoTrueClient 实例
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabaseClient, supabaseUrl, supabaseKey };