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
    <div className={`p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border transition-colors duration-300 ${error ? 'border-red-300 bg-red-50' : 'border-gray-100 hover:border-primary-200 shadow-sm'}`}>
      <label className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{label} <span className="text-red-500">*</span></label>
      <div className="flex gap-1 sm:gap-2">
        {[...Array(5)].map((_, index) => {
          const starIndex = index + 1;
          
          return (
            <button
              key={starIndex}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
              onClick={() => onChange(starIndex)}
              onMouseEnter={() => setHover(starIndex)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-200 ${
                  starIndex <= (hover || value)
                    ? 'fill-primary-500 text-primary-500'
                    : 'fill-gray-100 text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};