import React, { useState, useEffect } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  createdAt?: number;
}

interface ToasterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

interface ToasterContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToasterContext = React.createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
  const context = React.useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};

export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id, createdAt: Date.now() }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts((prev) =>
        prev.filter((toast) => {
          const duration = toast.duration || 5000;
          const createdAt = toast.createdAt || Date.now();
          return Date.now() - createdAt < duration;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToasterContext.Provider>
  );
};

export const Toaster: React.FC<ToasterProps> = ({ position = 'top-right' }) => {
  const { toasts, removeToast } = useToaster();

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position]}`}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeClasses[toast.type]} text-white p-4 rounded shadow-lg max-w-sm animate-fade-in`}
        >
          {toast.title && <h3 className="font-bold">{toast.title}</h3>}
          <p>{toast.description}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-2 right-2 text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toaster;
