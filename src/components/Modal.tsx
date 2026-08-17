import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  isDanger?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  isDanger = false,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`bg-dark-800 rounded-lg shadow-2xl w-full ${sizeClasses[size]} animate-slide-up`}>
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div className="flex items-center gap-2">
            {isDanger && <AlertCircle className="text-red-500" size={20} />}
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-dark-700 transition text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
