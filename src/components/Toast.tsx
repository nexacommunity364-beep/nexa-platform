import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeConfig = {
    success: { bg: 'bg-green-500/20', border: 'border-green-500/50', icon: CheckCircle },
    error: { bg: 'bg-red-500/20', border: 'border-red-500/50', icon: AlertCircle },
    info: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', icon: Info },
    warning: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', icon: AlertTriangle },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${config.bg} ${config.border} animate-fade-in`}
    >
      <Icon size={20} />
      <span className="flex-1 text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded transition"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
