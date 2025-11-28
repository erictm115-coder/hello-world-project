-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_books table
CREATE TABLE IF NOT EXISTS public.saved_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_title TEXT NOT NULL,
  book_author TEXT NOT NULL,
  book_cover TEXT,
  book_description TEXT,
  book_full_description TEXT,
  book_background TEXT,
  book_impact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_ideas table  
CREATE TABLE IF NOT EXISTS public.saved_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_title TEXT NOT NULL,
  idea_title TEXT NOT NULL,
  idea_explanation TEXT NOT NULL,
  idea_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_ideas table
CREATE TABLE IF NOT EXISTS public.user_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  idea_title TEXT NOT NULL,
  idea_content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fetched_books table
CREATE TABLE IF NOT EXISTS public.fetched_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_url TEXT,
  description TEXT,
  google_books_id TEXT UNIQUE,
  topics TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(title, author)
);

-- Create growth_stats table
CREATE TABLE IF NOT EXISTS public.growth_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_books_read INTEGER DEFAULT 0,
  total_time_minutes INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_topics TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fetched_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for saved_books
CREATE POLICY "Users can view own saved books" ON public.saved_books FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved books" ON public.saved_books FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved books" ON public.saved_books FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for saved_ideas
CREATE POLICY "Users can view own saved ideas" ON public.saved_ideas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved ideas" ON public.saved_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved ideas" ON public.saved_ideas FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_ideas
CREATE POLICY "Users can view own ideas" ON public.user_ideas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view approved ideas" ON public.user_ideas FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can insert own ideas" ON public.user_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ideas" ON public.user_ideas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ideas" ON public.user_ideas FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for fetched_books
CREATE POLICY "Everyone can view fetched books" ON public.fetched_books FOR SELECT USING (true);

-- RLS Policies for growth_stats
CREATE POLICY "Users can view own stats" ON public.growth_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stats" ON public.growth_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON public.growth_stats FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_saved_books_user_id ON public.saved_books(user_id);
CREATE INDEX idx_saved_ideas_user_id ON public.saved_ideas(user_id);
CREATE INDEX idx_user_ideas_user_id ON public.user_ideas(user_id);
CREATE INDEX idx_user_ideas_status ON public.user_ideas(status);
CREATE INDEX idx_growth_stats_user_id ON public.growth_stats(user_id);
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);