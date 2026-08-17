import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'date';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  helperText,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg bg-dark-700 border transition focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-dark-600 focus:border-nexa-500'
          } text-white placeholder-gray-500`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helperText && <p className="text-xs text-gray-400">{helperText}</p>}
    </div>
  );
};
