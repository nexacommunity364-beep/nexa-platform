import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  fullWidth = false,
}) => {
  const variantClasses = {
    primary:
      'bg-nexa-600 hover:bg-nexa-700 text-white shadow-lg shadow-nexa-600/30 hover:shadow-nexa-700/40',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30',
    ghost: 'bg-transparent hover:bg-dark-700 text-gray-300 hover:text-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};
