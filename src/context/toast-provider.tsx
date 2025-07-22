import React, { useState, useRef } from "react";
import { ToastContext } from "./toast-context.ts";
import type { ToastType } from "./toast-context.ts";

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<ToastType>({
        isOpen: false,
        title: null,
        message: null,
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showToast = (props: Omit<ToastType, "isOpen">, duration = 3000) => {
        setToast({ ...props, isOpen: true });

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setToast((prev) => ({ ...prev, isOpen: false }));
        }, duration);
    };

    const closeToast = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setToast((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <ToastContext.Provider value={{ toast, showToast, closeToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;