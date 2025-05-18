import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Global toast state
let toasts: Toast[] = [];
let listeners: (() => void)[] = [];

// Helper to notify listeners
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Toast functions
export const toast = {
  success: (message: string, duration = 3000) => {
    addToast({ message, type: 'success', duration });
  },
  error: (message: string, duration = 3000) => {
    addToast({ message, type: 'error', duration });
  },
  warning: (message: string, duration = 3000) => {
    addToast({ message, type: 'warning', duration });
  },
  info: (message: string, duration = 3000) => {
    addToast({ message, type: 'info', duration });
  }
};

const addToast = ({ message, type, duration = 3000 }: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  toasts = [...toasts, { id, message, type, duration }];
  notifyListeners();
  
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
};

const removeToast = (id: string) => {
  toasts = toasts.filter(toast => toast.id !== id);
  notifyListeners();
};

// Toast icon mapping
const ToastIcon: React.FC<{ type: ToastType }> = ({ type }) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'error':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'warning':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />;
  }
};

// Toast component
const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const { type, message } = toast;
  
  return (
    <div 
      className={`flex items-center justify-between w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border-l-4 ${
        type === 'success' ? 'border-green-500' : 
        type === 'error' ? 'border-red-500' :
        type === 'warning' ? 'border-yellow-500' : 'border-blue-500'
      } transform transition-all duration-300 hover:scale-102 animate-enter`}
    >
      <div className="flex items-center p-4">
        <div className="flex-shrink-0 mr-3">
          <ToastIcon type={type} />
        </div>
        <div className="text-sm text-gray-800 dark:text-gray-200">
          {message}
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast container
export const ToastContainer: React.FC = () => {
  const [localToasts, setLocalToasts] = useState<Toast[]>(toasts);
  
  useEffect(() => {
    const updateToasts = () => {
      setLocalToasts([...toasts]);
    };
    
    listeners.push(updateToasts);
    return () => {
      listeners = listeners.filter(listener => listener !== updateToasts);
    };
  }, []);
  
  // Create portal to body
  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {localToasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
};