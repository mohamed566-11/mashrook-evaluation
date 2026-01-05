-- إنشاء جدول لحفظ تقييمات العملاء
CREATE TABLE IF NOT EXISTS evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  investor_rep_rating INTEGER NOT NULL CHECK (investor_rep_rating >= 1 AND investor_rep_rating <= 5),
  advisory_team_rating INTEGER NOT NULL CHECK (advisory_team_rating >= 1 AND advisory_team_rating <= 5),
  output_quality_rating INTEGER NOT NULL CHECK (output_quality_rating >= 1 AND output_quality_rating <= 5),
  website_exp_rating INTEGER NOT NULL CHECK (website_exp_rating >= 1 AND website_exp_rating <= 5),
  will_recommend BOOLEAN NOT NULL,
  reason TEXT NOT NULL,
  other_reason TEXT,
  file_url TEXT,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء index لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_evaluations_created_at ON evaluations(created_at DESC);

-- تمكين Row Level Security (RLS)
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

-- إنشاء policy للسماح بالإدراج فقط (للعموم)
CREATE POLICY "Allow public insert" ON evaluations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- إنشاء policy للقراءة (يمكنك تعديلها حسب الحاجة)
CREATE POLICY "Allow public select" ON evaluations
  FOR SELECT
  TO public
  USING (true);

