# إعداد Supabase

## الخطوات المطلوبة:

### 1. إنشاء جدول في Supabase

1. اذهب إلى: https://supabase.com/dashboard/project/ciktscxbhfxltzitusvu/sql/new
2. انسخ محتوى ملف `supabase_setup.sql` والصقه في SQL Editor
3. اضغط Run لتنفيذ الكود

### 2. الحصول على API Keys

1. اذهب إلى Project Settings → API
2. انسخ:
   - **Project URL** (سيكون مثل: https://xxxxx.supabase.co)
   - **anon/public key**

### 3. إعداد ملف Environment Variables

أنشئ ملف `.env.local` في المجلد الرئيسي وأضف:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**مهم:** لا ترفع ملف `.env.local` على Git (موجود في .gitignore)

