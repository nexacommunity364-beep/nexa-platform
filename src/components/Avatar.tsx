import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'dnd';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-dark-800`}
      />
      {status && (
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-dark-800 ${statusColors[status]}`}
        />
      )}
    </div>
  );
};
