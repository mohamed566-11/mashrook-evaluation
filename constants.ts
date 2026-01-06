import { Translation, Language } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  ar: {
    title: "تقييم شركة مشروعك",
    description: "تكمن أهداف شركة مشروعك في توفير التسهيلات لرواد الأعمال وأصحاب المشاريع والمستثمرين والباحثين عن التمويل والراغبين في زيادة استثماراتهم. تقدم مشروعك قاعدة بيانات حديثة ومتطورة تتيح للباحثين والمستثمرين الاطلاع على كافة البيانات بشكل لحظي ومواكبة تطورات السوق.",
    form: {
      nameLabel: "الاسم",
      namePlaceholder: "أدخل اسمك الكريم",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني (اختياري)",
      phoneLabel: "رقم التليفون",
      phonePlaceholder: "أدخل رقم التليفون (اختياري)",
      investorRepLabel: "كيف تُقيّم أداء ممثل خدمة المستثمر (تم التواصل معه في البداية)؟",
      advisoryTeamLabel: "كيف تُقيّم أداء الفريق الاستشاري (القائم على إعداد محتوى الدراسة)؟",
      outputQualityLabel: "كيف تقيّم جودة المخرجات النهائية (الدراسة / التقرير / التحليل)؟",
      websiteExpLabel: "كيف كانت تجربتك مع موقعنا؟",
      recommendLabel: "هل يوجد فرصة لترشيح شركة مشروعك لأصدقائك؟",
      reasonLabel: "ما هو السبب الذي جذبك لتصبح عميلاً لدينا؟",
      reasonPlaceholder: "اختر سبباً أو اكتب ملاحظاتك...",
      otherReasonPlaceholder: "اكتب السبب...",
      uploadLabel: "تنظم شركة مشروعك استراتيجية جديدة لعام 2027 لعملائها الكرام. هل يوجد إمكانية برفع فيديو أو خطاب شكر موجه لشركة مشروعك؟",
      uploadHelp: "سيتم رفعه على الموقع الخاص بالشركة (مصدر فخر لنا)",
      submit: "إرسال التقييم",
      submitting: "جاري الإرسال...",
      successTitle: "شكراً لك!",
      successMessage: "تم استلام تقييمك بنجاح. نحن نقدر وقتك ورأيك.",
      yes: "نعم",
      no: "لا",
      selectReason: "اختر السبب...",
      reasons: [
        "سمعة الشركة",
        "جودة الخدمات",
        "الأسعار التنافسية",
        "توصية من صديق",
        "سهولة التواصل",
        "أخرى"
      ]
    },
    footer: "جميع الحقوق محفوظة © شركة مشروعك 2024"
  },
  en: {
    title: "Mashroo3k Company Evaluation",
    description: "The goals of Mashroo3k Company lie in providing facilities for entrepreneurs, project owners, investors, those seeking funding, and those wishing to increase their investments. Mashroo3k offers a modern and advanced database that allows researchers and investors to review all data in real time.",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email (optional)",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number (optional)",
      investorRepLabel: "How do you rate the performance of the Investor Service Representative?",
      advisoryTeamLabel: "How do you rate the performance of the Advisory Team?",
      outputQualityLabel: "How do you rate the quality of the final output (Study/Report)?",
      websiteExpLabel: "How was your experience with our website?",
      recommendLabel: "Is there a chance you would recommend Mashroo3k to your friends?",
      reasonLabel: "What was the reason that attracted you to become our client?",
      reasonPlaceholder: "Select a reason or write notes...",
      otherReasonPlaceholder: "Please specify the reason...",
      uploadLabel: "Mashroo3k is organizing a new strategy for 2027. Is it possible to upload a video or thank you letter?",
      uploadHelp: "It will be uploaded to the company's website (a source of pride for us)",
      submit: "Submit Evaluation",
      submitting: "Sending...",
      successTitle: "Thank You!",
      successMessage: "Your evaluation has been received successfully. We appreciate your time and feedback.",
      yes: "Yes",
      no: "No",
      selectReason: "Select reason...",
      reasons: [
        "Company Reputation",
        "Service Quality",
        "Competitive Prices",
        "Friend Recommendation",
        "Ease of Communication",
        "Other"
      ]
    },
    footer: "All rights reserved © Mashroo3k Company 2024"
  }
};