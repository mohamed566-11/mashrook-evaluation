import React from 'react';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, placeholder, required, error }) => {
  return (
    <div className={`p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border transition-colors ${error ? 'border-red-300 bg-red-50' : 'border-gray-100 shadow-sm hover:border-primary-200'}`} data-error={error || undefined}>
      <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-base sm:text-lg">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border outline-none transition-all duration-200 ${error ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 sm:focus:ring-4 focus:ring-red-100' : 'border-gray-300 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 sm:focus:ring-4 focus:ring-primary-100'}`}
      />
    </div>
  );
};