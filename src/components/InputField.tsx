import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  helperText,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-lg border transition outline-none text-white placeholder-gray-500 ${
          error
            ? 'bg-red-500/10 border-red-500/50 focus:border-red-500'
            : 'bg-dark-700 border-dark-600 focus:border-nexa-500'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {error && (
        <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
      {helperText && !error && (
        <p className="text-xs text-gray-400 mt-1">{helperText}</p>
      )}
    </div>
  );
};
