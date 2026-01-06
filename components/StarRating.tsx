import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ label, value, onChange, error }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={`p-5 sm:p-7 bg-white rounded-xl sm:rounded-2xl border transition-all duration-200 ${error ? 'border-red-300 bg-red-50 shadow-red-100' : 'border-gray-200 shadow-md hover:shadow-lg'}`}>
      <label className="block text-gray-900 font-bold mb-4 sm:mb-5 text-base sm:text-lg flex items-center gap-2">
        <span className="w-1 h-5 bg-primary-500 rounded-full"></span>
        {label} <span className="text-red-500 text-lg">*</span>
      </label>
      <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
        {[...Array(5)].map((_, index) => {
          const starIndex = index + 1;
          
          return (
            <button
              key={starIndex}
              type="button"
              className="focus:outline-none transition-all duration-200 hover:scale-125 active:scale-95"
              onClick={() => onChange(starIndex)}
              onMouseEnter={() => setHover(starIndex)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={`w-7 h-7 sm:w-9 sm:h-9 transition-all duration-200 ${
                  starIndex <= (hover || value)
                    ? 'fill-primary-500 text-primary-500 drop-shadow-md'
                    : 'fill-gray-200 text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};