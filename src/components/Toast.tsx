import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

let toastId = 0;
const toasts: Map<number, ToastProps> = new Map();
const listeners: Set<() => void> = new Set();

const notify = (toast: ToastProps) => {
  const id = toastId++;
  toasts.set(id, toast);
  listeners.forEach((listener) => listener());

  if (toast.duration !== Infinity) {
    setTimeout(() => {
      toasts.delete(id);
      listeners.forEach((listener) => listener());
    }, toast.duration || 3000);
  }

  return id;
};

export const Toast = {
  success: (message: string, duration?: number) =>
    notify({ message, type: 'success', duration }),
  error: (message: string, duration?: number) =>
    notify({ message, type: 'error', duration }),
  warning: (message: string, duration?: number) =>
    notify({ message, type: 'warning', duration }),
  info: (message: string, duration?: number) =>
    notify({ message, type: 'info', duration }),
};

export const ToastContainer: React.FC = () => {
  const [toastList, setToastList] = React.useState<Array<[number, ToastProps]>>([]);

  React.useEffect(() => {
    const listener = () => setToastList(Array.from(toasts.entries()));
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const typeClasses = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toastList.map(([id, toast]) => (
        <div
          key={id}
          className={`px-4 py-3 rounded-lg border backdrop-blur-sm animate-slide-in ${
            typeClasses[toast.type || 'info']
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
