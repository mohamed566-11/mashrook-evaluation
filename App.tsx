import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, Send } from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language, FormState } from './types';
import { StarRating } from './components/StarRating';
import { LanguageToggle } from './components/LanguageToggle';
import { FormInput } from './components/FormInput';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  const [formState, setFormState] = useState<FormState>({
    name: '',
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

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

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

  const handleSubmit = (e: React.FormEvent) => {
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
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState({ ...formState, file: e.target.files[0] });
    }
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 font-${isRTL ? 'cairo' : 'sans'}`}>
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full text-center border-t-8 border-primary-500">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.form.successTitle}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{t.form.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 font-${isRTL ? 'cairo' : 'sans'}`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/file.png"
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          </div>
          <LanguageToggle currentLang={lang} onToggle={setLang} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">

        {/* Intro Card */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary-500"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.title}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

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
          <div className={`p-6 bg-white rounded-2xl border transition-colors ${errors.willRecommend ? 'border-red-300 bg-red-50' : 'border-gray-100 shadow-sm'}`} data-error={errors.willRecommend || undefined}>
            <label className="block text-gray-800 font-semibold mb-4 text-lg">
              {t.form.recommendLabel} <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormState({ ...formState, willRecommend: true });
                  if (errors.willRecommend) setErrors({ ...errors, willRecommend: false });
                }}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${formState.willRecommend === true
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
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${formState.willRecommend === false
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 text-gray-500 hover:border-red-200'
                  }`}
              >
                {t.form.no}
              </button>
            </div>
          </div>

          {/* Reason Selection */}
          <div className={`p-6 bg-white rounded-2xl border transition-colors ${errors.reason || errors.otherReason ? 'border-red-300 bg-red-50' : 'border-gray-100 shadow-sm'}`} data-error={errors.reason || errors.otherReason || undefined}>
            <label className="block text-gray-800 font-semibold mb-3 text-lg">{t.form.reasonLabel} <span className="text-red-500">*</span></label>
            <div className="space-y-3">
              <select
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 ${errors.reason ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100'} text-gray-700`}
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
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 mt-3 ${errors.otherReason ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100'} text-gray-700`}
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
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <label className="block text-gray-800 font-semibold mb-2 text-lg">{t.form.uploadLabel}</label>
            <p className="text-sm text-gray-500 mb-4">{t.form.uploadHelp}</p>

            <div className="relative border-2 border-dashed border-primary-200 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors p-8 text-center cursor-pointer group">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                accept="video/*,application/pdf,image/*"
              />
              <div className="flex flex-col items-center gap-3 pointer-events-none">
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-primary-700 font-medium truncate max-w-xs">
                  {formState.file ? formState.file.name : (isRTL ? 'اضغط لرفع الملف' : 'Click to upload file')}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg shadow-primary-200 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
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

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>{t.footer}</p>
        </footer>

      </main>
    </div>
  );
};

export default App;