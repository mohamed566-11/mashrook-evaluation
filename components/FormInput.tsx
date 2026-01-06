import React from 'react';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  type?: string;
  placeholderRight?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, placeholder, required, error, type = "text", placeholderRight = false }) => {
  return (
    <div className={`p-5 sm:p-7 bg-white rounded-xl sm:rounded-2xl border transition-all duration-200 ${error ? 'border-red-300 bg-red-50 shadow-red-100' : 'border-gray-200 shadow-md hover:shadow-lg'}`} data-error={error || undefined}>
      <label className="block text-gray-900 font-bold mb-4 sm:mb-5 text-base sm:text-lg flex items-center gap-2">
        <span className="w-1 h-5 bg-primary-500 rounded-full"></span>
        {label} {required && <span className="text-red-500 text-lg">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border outline-none transition-all duration-200 shadow-sm font-medium ${placeholderRight ? 'text-right' : ''} ${error ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 hover:border-primary-300'}`}
      />
    </div>
  );
};