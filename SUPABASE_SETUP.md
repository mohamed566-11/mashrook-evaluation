# إعداد Supabase

## الخطوات المطلوبة:

### 1. إنشاء جدول في Supabase

1. اذهب إلى: https://supabase.com/dashboard/project/ciktscxbhfxltzitusvu/sql/new
2. انسخ محتوى ملف `supabase_setup.sql` والصقه في SQL Editor
3. اضغط Run لتنفيذ الكود

### 2. إنشاء Storage Bucket للملفات (مهم)

لرفع الملفات وتحميلها، يجب إنشاء Storage Bucket:

1. اذهب إلى **Storage** في القائمة الجانبية في Supabase Dashboard
2. اضغط **New bucket**
3. **اسم الـ bucket:** `evaluations`
4. اختر **Public bucket** ✅ (مهم: يجب أن يكون Public ليمكن تحميل الملفات)
5. اضغط **Create bucket**

**إعدادات الـ Bucket (اختياري):**
- File size limit: يمكنك تحديد الحد الأقصى (مثلاً 50MB)
- Allowed MIME types: اتركه فارغاً للسماح بجميع الأنواع

### 3. إعداد Storage Policies (مهم)

بعد إنشاء الـ bucket، تحتاج لإضافة Policies:

1. اذهب إلى **Storage** → **Policies**
2. اختر bucket `evaluations`
3. اضغط **New Policy**
4. اختر **For full customization** → **Create a policy from scratch**
5. اسم الـ Policy: `Allow public upload and read`
6. Target roles: `public`
7. Policy definition: اختر:
   - **INSERT**: `true`
   - **SELECT**: `true`
8. اضغط **Review** → **Save policy**

**أو يمكنك استخدام SQL:**
```sql
-- السماح برفع الملفات (INSERT)
CREATE POLICY "Allow public upload"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'evaluations');

-- السماح بقراءة/تحميل الملفات (SELECT)
CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'evaluations');
```

### 4. الحصول على API Keys

1. اذهب إلى Project Settings → API
2. انسخ:
   - **Project URL** (سيكون مثل: https://xxxxx.supabase.co)
   - **anon/public key**

### 5. إعداد ملف Environment Variables

أنشئ ملف `.env.local` في المجلد الرئيسي وأضف:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**مهم:** لا ترفع ملف `.env.local` على Git (موجود في .gitignore)

