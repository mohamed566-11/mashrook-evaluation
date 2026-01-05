# حل مشكلة "Bucket not found"

## المشكلة:
الخطأ "Bucket not found" يعني أن الـ Storage Bucket لم يتم إنشاؤه بعد في Supabase.

## الحل:

### الخطوة 1: إنشاء Storage Bucket

1. اذهب إلى Supabase Dashboard: https://supabase.com/dashboard/project/ciktscxbhfxltzitusvu
2. اضغط على **Storage** في القائمة الجانبية
3. اضغط **New bucket**
4. **اسم الـ bucket:** `evaluations` (بالضبط كما هو - مهم جداً!)
5. ✅ اختر **Public bucket** (مهم!)
6. اضغط **Create bucket**

### الخطوة 2: التحقق من Policies

بعد إنشاء الـ Bucket، تأكد من أن Policies موجودة:

1. اذهب إلى **SQL Editor**
2. تأكد من تنفيذ الكود التالي (إذا لم يكن موجوداً):

```sql
-- السماح برفع الملفات
CREATE POLICY "Allow public upload"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'evaluations');

-- السماح بقراءة/تحميل الملفات
CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'evaluations');
```

3. إذا ظهرت رسالة "policy already exists"، لا تقلق - هذا جيد!

### الخطوة 3: التحقق من أن Bucket موجود

1. اذهب إلى **Storage**
2. يجب أن ترى bucket باسم `evaluations`
3. اضغط عليه للتأكد من أنه موجود

### الخطوة 4: اختبار

بعد إنشاء الـ Bucket:
1. أعد تحميل الصفحة (F5)
2. جرب رفع ملف مرة أخرى
3. يجب أن يعمل الآن! ✅

---

## ملاحظات مهمة:

- ✅ اسم الـ Bucket يجب أن يكون `evaluations` بالضبط (بدون مسافات، صغير)
- ✅ يجب أن يكون **Public bucket**
- ✅ Policies يجب أن تشير إلى `bucket_id = 'evaluations'`

