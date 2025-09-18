-- Add missing fields to masters table
ALTER TABLE public.masters 
ADD COLUMN gender text CHECK (gender IN ('male', 'female', 'other')),
ADD COLUMN age integer CHECK (age >= 18 AND age <= 100),
ADD COLUMN experience_years integer DEFAULT 0,
ADD COLUMN rating decimal(3,2) DEFAULT 0.00 CHECK (rating >= 0.00 AND rating <= 5.00),
ADD COLUMN total_consultations integer DEFAULT 0,
ADD COLUMN phone text,
ADD COLUMN wechat text,
ADD COLUMN location text,
ADD COLUMN tags text[], -- 专长标签数组
ADD COLUMN is_online boolean DEFAULT false,
ADD COLUMN last_active_at timestamptz DEFAULT timezone('utc'::text, now());

-- Add some sample data for testing (optional)
-- You can remove this section if you don't want sample data
INSERT INTO public.masters (
    user_id, 
    name, 
    specialty, 
    price_per_msg, 
    is_verified, 
    bio, 
    gender, 
    age, 
    experience_years,
    rating,
    total_consultations,
    tags,
    is_online
) VALUES 
-- Note: You'll need to replace these UUIDs with actual user IDs from your users table
-- This is just example structure
-- ('user-uuid-1', '张大师', '八字命理', 50.00, true, '资深八字命理师，从业20年，擅长事业财运分析', 'male', 45, 20, 4.8, 1250, ARRAY['八字', '事业', '财运'], true),
-- ('user-uuid-2', '李老师', '风水堪舆', 80.00, true, '风水堪舆专家，祖传三代，精通阳宅阴宅风水布局', 'female', 38, 15, 4.9, 890, ARRAY['风水', '家居', '办公'], false);
ON CONFLICT (user_id) DO NOTHING;