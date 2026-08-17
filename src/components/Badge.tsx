import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'sm',
  children,
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-nexa-600 text-white',
    secondary: 'bg-dark-700 text-gray-300',
    success: 'bg-green-500/20 text-green-400',
    danger: 'bg-red-500/20 text-red-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    info: 'bg-blue-500/20 text-blue-400',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium transition ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};
