# إعداد Environment Variables في Vercel

## الخطوات المطلوبة:

### 1. الحصول على Supabase Credentials

1. اذهب إلى Supabase Dashboard: https://supabase.com/dashboard/project/ciktscxbhfxltzitusvu
2. اذهب إلى **Settings** → **API**
3. انسخ القيم التالية:
   - **Project URL** (مثل: `https://xxxxx.supabase.co`)
   - **anon public key** (في قسم Project API keys)

### 2. إضافة Environment Variables في Vercel

1. اذهب إلى Vercel Dashboard: https://vercel.com/dashboard
2. اختر مشروعك
3. اذهب إلى **Settings** → **Environment Variables**
4. أضف المتغيرات التالية:

   **الاسم الأول:**
   ```
   VITE_SUPABASE_URL
   ```
   **القيمة:**
   ```
   https://your-project-url.supabase.co
   ```
   (استبدل `your-project-url` بـ URL مشروعك الفعلي)

   ---

   **الاسم الثاني:**
   ```
   VITE_SUPABASE_ANON_KEY
   ```
   **القيمة:**
   ```
   your-anon-key-here
   ```
   (الصق الـ anon key من Supabase)

5. اختر **Environment**: Production, Preview, Development (أو اختر جميعها)
6. اضغط **Save**

### 3. إعادة نشر المشروع

بعد إضافة Environment Variables:
1. اذهب إلى **Deployments**
2. اضغط على آخر deployment
3. اضغط **Redeploy** (أو Vercel سيعيد النشر تلقائياً عند push جديد)

أو يمكنك عمل:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### 4. التحقق من العمل

بعد النشر:
1. افتح الموقع
2. املأ النموذج وأرسله
3. اذهب إلى Supabase → **Table Editor** → **evaluations**
4. تأكد من ظهور البيانات الجديدة

---

**ملاحظة:** إذا كنت تعمل محلياً، أنشئ ملف `.env.local` في المجلد الرئيسي:

```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

