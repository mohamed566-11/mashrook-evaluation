export type Language = 'ar' | 'en';

export interface Translation {
  title: string;
  description: string;
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    investorRepLabel: string;
    advisoryTeamLabel: string;
    outputQualityLabel: string;
    websiteExpLabel: string;
    recommendLabel: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    otherReasonPlaceholder: string;
    uploadLabel: string;
    uploadHelp: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    yes: string;
    no: string;
    selectReason: string;
    reasons: string[];
  };
  footer: string;
}

export interface FormState {
  name: string;
  email: string;
  phone: string;
  investorRepRating: number;
  advisoryTeamRating: number;
  outputQualityRating: number;
  websiteExpRating: number;
  willRecommend: boolean | null;
  reason: string;
  otherReason: string;
  file: File | null;
}