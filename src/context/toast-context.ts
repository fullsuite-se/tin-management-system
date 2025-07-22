import { createContext } from "react";

type ToastType = {
    isOpen: boolean,
    title: string | null,
    message: string | null,
}

type ToastContextType = {
    toast: ToastType,
    showToast: (props: Omit<ToastType, "isOpen">, duration?: number) => void;
    closeToast: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
export type { ToastType, ToastContextType }