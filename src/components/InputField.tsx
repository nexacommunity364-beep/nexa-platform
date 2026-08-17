import React from 'react';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error,
  icon,
  helperText,
  required = false,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} py-2 rounded-lg bg-dark-700 border transition text-white placeholder-gray-500 focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-dark-600 focus:border-nexa-500'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      {!error && helperText && <p className="text-gray-500 text-xs mt-1">{helperText}</p>}
    </div>
  );
};
