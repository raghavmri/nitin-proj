"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";

interface ToastContextProps {
  toast: (options: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<
    {
      id: number;
      title: string;
      description?: string;
      variant?: "default" | "destructive";
    }[]
  >([]);

  const toast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => {
    setToasts((prev) => [
      ...prev,
      { id: Date.now(), title, description, variant },
    ]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        <ToastViewport>
          {toasts.map(({ id, title, description, variant }) => (
            <Toast key={id} variant={variant}>
              <div className="flex flex-col space-y-2">
                <ToastTitle>{title}</ToastTitle>
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              <ToastClose />
            </Toast>
          ))}
        </ToastViewport>
      </ToastProvider>
    </ToastContext.Provider>
  );
};
