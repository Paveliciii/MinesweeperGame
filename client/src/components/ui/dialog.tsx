import React, { createContext, useContext, useState } from 'react';

// Типы для контекста диалога
type DialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

// Создаем контекст
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// Хук для использования контекста диалога
function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog provider');
  }
  return context;
}

// Корневой компонент диалога
interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
  const [openState, setOpenState] = useState(open || false);
  
  const value = {
    open: open !== undefined ? open : openState,
    setOpen: (newOpen: boolean) => {
      if (open === undefined) {
        setOpenState(newOpen);
      }
      onOpenChange?.(newOpen);
    },
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  );
}

// Триггер для открытия диалога
interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function DialogTrigger({ children, asChild = false }: DialogTriggerProps) {
  const { setOpen } = useDialogContext();
  
  const handleClick = () => {
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e);
        handleClick();
      },
    } as any);
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

// Контент диалога
interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
  const { open, setOpen } = useDialogContext();
  
  if (!open) return null;

  // Обработчик клика по оверлею для закрытия диалога
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div 
        className={`bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// Заголовок диалога
interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return (
    <div className={`mb-4 text-center ${className}`}>
      {children}
    </div>
  );
}

// Заголовок диалога
interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
  return (
    <h2 className={`text-xl font-semibold ${className}`}>
      {children}
    </h2>
  );
}

// Описание диалога
interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({ children, className = '' }: DialogDescriptionProps) {
  return (
    <p className={`text-gray-500 ${className}`}>
      {children}
    </p>
  );
}

// Футер диалога
interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className = '' }: DialogFooterProps) {
  return (
    <div className={`mt-6 flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );
}

// Кнопка закрытия диалога
interface DialogCloseProps {
  children?: React.ReactNode;
  className?: string;
}

export function DialogClose({ children, className = '' }: DialogCloseProps) {
  const { setOpen } = useDialogContext();
  
  const handleClick = () => {
    setOpen(false);
  };

  if (!children) {
    return (
      <button
        type="button"
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
        onClick={handleClick}
        aria-label="Close"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Dialog;
