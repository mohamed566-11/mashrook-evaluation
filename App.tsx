import React, { useState, useEffect, useRef } from 'react';
import { Upload, CheckCircle, Send } from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language, FormState } from './types';
import { StarRating } from './components/StarRating';
import { LanguageToggle } from './components/LanguageToggle';
import { FormInput } from './components/FormInput';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    investorRepRating: 0,
    advisoryTeamRating: 0,
    outputQualityRating: 0,
    websiteExpRating: 0,
    willRecommend: null,
    reason: '',
    otherReason: '',
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const lastInputRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

  // اختبار الاتصال بـ Supabase عند تحميل الصفحة
  useEffect(() => {
    const testConnection = async () => {
      console.log('🔍 اختبار الاتصال بـ Supabase...');
      try {
        const { data, error } = await supabase
          .from('evaluations')
          .select('count')
          .limit(1);

        if (error) {
          console.error('❌ خطأ في الاتصال:', error.message);
          console.error('تفاصيل الخطأ:', error);
        } else {
          console.log('✅ الاتصال بـ Supabase ناجح!');
        }
      } catch (err) {
        console.error('❌ خطأ في الاتصال:', err);
      }
    };

    testConnection();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};

    if (!formState.name.trim()) {
      newErrors.name = true;
    }
    if (formState.investorRepRating === 0) {
      newErrors.investorRepRating = true;
    }
    if (formState.advisoryTeamRating === 0) {
      newErrors.advisoryTeamRating = true;
    }
    if (formState.outputQualityRating === 0) {
      newErrors.outputQualityRating = true;
    }
    if (formState.websiteExpRating === 0) {
      newErrors.websiteExpRating = true;
    }
    if (formState.willRecommend === null) {
      newErrors.willRecommend = true;
    }
    if (!formState.reason.trim()) {
      newErrors.reason = true;
    }
    if (formState.reason === (isRTL ? 'أخرى' : 'Other') && !formState.otherReason.trim()) {
      newErrors.otherReason = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('[data-error="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // الحصول على رابط الملف إذا كان موجود (تم رفعه مسبقاً)
      let fileUrl = null;
      let fileName = null;

      if (formState.file) {
        fileName = formState.file.name;
        // إذا كان الملف قد تم رفعه مسبقاً (يحتوي على uploadedUrl)
        if ((formState.file as any).uploadedUrl) {
          fileUrl = (formState.file as any).uploadedUrl;
        }
      }

      // حفظ البيانات في قاعدة البيانات
      const { data, error } = await supabase
        .from('evaluations')
        .insert([
          {
            name: formState.name,
            email: formState.email.trim() || null,
            phone: formState.phone.trim() || null,
            investor_rep_rating: formState.investorRepRating,
            advisory_team_rating: formState.advisoryTeamRating,
            output_quality_rating: formState.outputQualityRating,
            website_exp_rating: formState.websiteExpRating,
            will_recommend: formState.willRecommend,
            reason: formState.reason,
            other_reason: formState.reason === (isRTL ? 'أخرى' : 'Other') ? formState.otherReason : null,
            file_url: fileUrl,
            file_name: fileName,
          },
        ])
        .select();

      if (error) {
        console.error('Error submitting form:', error);
        alert(isRTL ? 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.' : 'Error submitting evaluation. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // نجح الإرسال
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error:', error);
      alert(isRTL ? 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.' : 'An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormState({ ...formState, file });
      setFileSize(file.size);
      setUploadProgress(0);
      setIsUploading(true);

      // رفع الملف فوراً
      try {
        const fileExt = file.name.split('.').pop();
        const fileNameUnique = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        // محاكاة شريط التقدم
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) return prev;
            return prev + 10;
          });
        }, 200);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('evaluations')
          .upload(fileNameUnique, file, {
            cacheControl: '3600',
            upsert: false
          });

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          setUploadProgress(0);
          setIsUploading(false);
          alert(isRTL ? 'حدث خطأ أثناء رفع الملف. يرجى المحاولة مرة أخرى.' : 'Error uploading file. Please try again.');
          setFormState({ ...formState, file: null });
          setFileSize(null);
          return;
        }

        // الحصول على رابط الملف
        const { data: { publicUrl } } = supabase.storage
          .from('evaluations')
          .getPublicUrl(fileNameUnique);

        // حفظ رابط الملف في state (يمكن إضافته في FormState لاحقاً)
        setFormState({
          ...formState,
          file: Object.assign(file, { uploadedUrl: publicUrl, uploadedFileName: fileNameUnique })
        });

        setIsUploading(false);
        setTimeout(() => setUploadProgress(0), 500);
      } catch (error) {
        console.error('Error:', error);
        setIsUploading(false);
        setUploadProgress(0);
        setFormState({ ...formState, file: null });
        setFileSize(null);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 font-${isRTL ? 'cairo' : 'sans'}`}>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 max-w-lg w-full text-center border-t-8 border-primary-500">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{t.form.successTitle}</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t.form.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 font-${isRTL ? 'cairo' : 'sans'}`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/file.png"
              alt="Logo"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain"
            />
          </div>
          <LanguageToggle currentLang={lang} onToggle={setLang} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-3xl">

        {/* Intro Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary-500"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{t.title}</h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {t.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

          <FormInput
            label={t.form.nameLabel}
            value={formState.name}
            onChange={(val) => {
              setFormState({ ...formState, name: val });
              if (errors.name) setErrors({ ...errors, name: false });
            }}
            placeholder={t.form.namePlaceholder}
            required
            error={errors.name}
          />

          <FormInput
            label={t.form.emailLabel}
            value={formState.email}
            onChange={(val) => {
              setFormState({ ...formState, email: val });
            }}
            placeholder={t.form.emailPlaceholder}
            type="email"
          />

          <FormInput
            label={t.form.phoneLabel}
            value={formState.phone}
            onChange={(val) => {
              setFormState({ ...formState, phone: val });
            }}
            placeholder={t.form.phonePlaceholder}
            type="tel"
          />

          <div data-error={errors.investorRepRating || undefined}>
            <StarRating
              label={t.form.investorRepLabel}
              value={formState.investorRepRating}
              onChange={(v) => {
                setFormState({ ...formState, investorRepRating: v });
                if (errors.investorRepRating) setErrors({ ...errors, investorRepRating: false });
              }}
              error={errors.investorRepRating}
            />
          </div>

          <div data-error={errors.advisoryTeamRating || undefined}>
            <StarRating
              label={t.form.advisoryTeamLabel}
              value={formState.advisoryTeamRating}
              onChange={(v) => {
                setFormState({ ...formState, advisoryTeamRating: v });
                if (errors.advisoryTeamRating) setErrors({ ...errors, advisoryTeamRating: false });
              }}
              error={errors.advisoryTeamRating}
            />
          </div>

          <div data-error={errors.outputQualityRating || undefined}>
            <StarRating
              label={t.form.outputQualityLabel}
              value={formState.outputQualityRating}
              onChange={(v) => {
                setFormState({ ...formState, outputQualityRating: v });
                if (errors.outputQualityRating) setErrors({ ...errors, outputQualityRating: false });
              }}
              error={errors.outputQualityRating}
            />
          </div>

          <div data-error={errors.websiteExpRating || undefined}>
            <StarRating
              label={t.form.websiteExpLabel}
              value={formState.websiteExpRating}
              onChange={(v) => {
                setFormState({ ...formState, websiteExpRating: v });
                if (errors.websiteExpRating) setErrors({ ...errors, websiteExpRating: false });
              }}
              error={errors.websiteExpRating}
            />
          </div>

          {/* Yes/No Question */}
          <div className={`p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border transition-colors ${errors.willRecommend ? 'border-red-300 bg-red-50' : 'border-gray-100 shadow-sm'}`} data-error={errors.willRecommend || undefined}>
            <label className="block text-gray-800 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              {t.form.recommendLabel} <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormState({ ...formState, willRecommend: true });
                  if (errors.willRecommend) setErrors({ ...errors, willRecommend: false });
                }}
                className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm rounded-lg sm:rounded-xl font-semibold transition-all duration-200 border-2 ${formState.willRecommend === true
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-500 hover:border-primary-200'
                  }`}
              >
                {t.form.yes}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormState({ ...formState, willRecommend: false });
                  if (errors.willRecommend) setErrors({ ...errors, willRecommend: false });
                }}
                className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm rounded-lg sm:rounded-xl font-semibold transition-all duration-200 border-2 ${formState.willRecommend === false
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 text-gray-500 hover:border-red-200'
                  }`}
              >
                {t.form.no}
              </button>
            </div>
          </div>

          {/* Reason Selection */}
          <div ref={lastInputRef} className={`p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border transition-colors ${errors.reason || errors.otherReason ? 'border-red-300 bg-red-50' : 'border-gray-100 shadow-sm'}`} data-error={errors.reason || errors.otherReason || undefined}>
            <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{t.form.reasonLabel} <span className="text-red-500">*</span></label>
            <div className="space-y-2 sm:space-y-3">
              <select
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl border outline-none transition-all duration-200 ${errors.reason ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 sm:focus:ring-4 focus:ring-red-100' : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 sm:focus:ring-4 focus:ring-primary-100'} text-gray-700`}
                value={formState.reason}
                onChange={(e) => {
                  setFormState({ ...formState, reason: e.target.value, otherReason: e.target.value === (isRTL ? 'أخرى' : 'Other') ? formState.otherReason : '' });
                  if (errors.reason) setErrors({ ...errors, reason: false });
                }}
              >
                <option value="">{t.form.selectReason}</option>
                {t.form.reasons.map((r, idx) => (
                  <option key={idx} value={r}>{r}</option>
                ))}
              </select>
              {(formState.reason === (isRTL ? 'أخرى' : 'Other')) && (
                <input
                  type="text"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl border outline-none transition-all duration-200 mt-2 sm:mt-3 ${errors.otherReason ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 sm:focus:ring-4 focus:ring-red-100' : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 sm:focus:ring-4 focus:ring-primary-100'} text-gray-700`}
                  placeholder={t.form.otherReasonPlaceholder}
                  value={formState.otherReason}
                  onChange={(e) => {
                    setFormState({ ...formState, otherReason: e.target.value });
                    if (errors.otherReason) setErrors({ ...errors, otherReason: false });
                  }}
                />
              )}
            </div>
          </div>

          {/* File Upload */}
          <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
            <label className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">{t.form.uploadLabel}</label>
            <p className="text-xs text-gray-500 mb-3 sm:mb-4">{t.form.uploadHelp}</p>

            <div className="relative border-2 border-dashed border-primary-200 rounded-lg sm:rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors p-6 sm:p-8 text-center cursor-pointer group">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                accept="video/*,application/pdf,image/*"
                disabled={isUploading}
              />
              <div className="flex flex-col items-center gap-2 sm:gap-3 pointer-events-none">
                <div className="p-2 sm:p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <span className="text-primary-700 font-medium text-xs sm:text-sm truncate max-w-xs">
                  {formState.file ? formState.file.name : (isRTL ? 'اضغط لرفع الملف' : 'Click to upload file')}
                </span>
                {fileSize && (
                  <span className="text-gray-500 text-xs">
                    {(() => {
                      const bytes = fileSize;
                      if (bytes === 0) return '0 Bytes';
                      const k = 1024;
                      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                      const i = Math.floor(Math.log(bytes) / Math.log(k));
                      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
                    })()}
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{isRTL ? 'جاري الرفع...' : 'Uploading...'}</span>
                  <span className="text-primary-600 font-semibold">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {formState.file && !isUploading && uploadProgress === 0 && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  {isRTL ? '✓ الملف جاهز للإرسال' : '✓ File ready to submit'}
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full bg-primary-600 text-white font-bold text-base sm:text-lg py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg shadow-primary-200 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t.form.submitting}
              </>
            ) : (
              <>
                <Send className="w-5 h-5 rtl:rotate-180" />
                {t.form.submit}
              </>
            )}
          </button>

        </form>

      </main>

      {/* Footer */}
      <footer className="mt-4 sm:mt-6 bg-gradient-to-r from-primary-700 to-primary-600 text-white py-4 sm:py-5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-row items-center justify-between gap-4 sm:gap-6 flex-wrap">
            {/* Services and Branches - Left */}
            <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 flex-1 min-w-0">
              {/* Services */}
              <div className="animate-fade-in flex-shrink-0">
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2">خدماتنا ومجالاتنا</h3>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs sm:text-sm">
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">الاستشارات الاقتصادية</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">الاستشارات الإدارية</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">الاستشارات التسويقية</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">الاستشارات المالية</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">استشارات المطاعم والكوفي شوب</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">خدمات التمويل</li>
                </ul>
              </div>

              {/* Branches */}
              <div className="animate-fade-in-delay-1 flex-shrink-0">
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2">الفروع</h3>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs sm:text-sm">
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">الرياض</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">دبي</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">الدوحة</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">مسقط</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">بغداد</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">القاهرة</li>
                  <li className="hover:text-primary-200 transition-colors duration-200 cursor-default">صنعاء</li>
                </ul>
              </div>
            </div>

            {/* Copyright - Right */}
            <div className="animate-fade-in-delay-2 flex-shrink-0">
              <p className="text-sm sm:text-base font-medium whitespace-nowrap">
                جميع الحقوق محفوظة © شركة مشروعك 2025
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;