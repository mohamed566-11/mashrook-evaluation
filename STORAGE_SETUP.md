# إعداد Supabase Storage لرفع وتحميل الملفات

## الخطوات المطلوبة:

### 1. إنشاء Storage Bucket

1. اذهب إلى Supabase Dashboard: https://supabase.com/dashboard/project/ciktscxbhfxltzitusvu
2. اضغط على **Storage** في القائمة الجانبية
3. اضغط **New bucket**
4. **اسم الـ bucket:** `evaluations`
5. ✅ اختر **Public bucket** (مهم جداً!)
6. اضغط **Create bucket**

### 2. إعداد Storage Policies

بعد إنشاء الـ bucket، تحتاج لإضافة Policies للسماح برفع وتحميل الملفات:

#### الطريقة الأولى: استخدام SQL Editor (أسهل)

1. اذهب إلى **SQL Editor**
2. انسخ والصق الكود التالي:

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

3. اضغط **Run**

#### الطريقة الثانية: من Storage Policies

1. اذهب إلى **Storage** → **Policies**
2. اختر bucket `evaluations`
3. اضغط **New Policy**
4. اختر **For full customization** → **Create a policy from scratch**
5. اسم الـ Policy: `Allow public upload`
6. Target roles: `public`
7. Policy definition:
   - **INSERT**: `true`
8. اضغط **Review** → **Save policy**

6. كرر الخطوات لإنشاء Policy ثانية:
   - اسم: `Allow public read`
   - **SELECT**: `true`

### 3. التحقق من العمل

بعد إعداد كل شيء:
1. اذهب إلى النموذج في الموقع
2. ارفع ملف
3. أرسل النموذج
4. اذهب إلى **Storage** → **evaluations** → تأكد من ظهور الملف
5. اضغط على الملف لرؤية رابط التحميل

---

## ملاحظات مهمة:

- ✅ يجب أن يكون الـ bucket **Public** ليمكن تحميل الملفات
- ✅ يجب إضافة Policies للسماح بـ INSERT و SELECT
- ✅ الملفات ستحفظ باسم فريد لتجنب التضارب
- ✅ رابط الملف سيحفظ في قاعدة البيانات في حقل `file_url`

