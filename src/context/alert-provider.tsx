import React, { useState } from "react";
import { AlertContext } from "./alert-context.ts";
import type { AlertType } from "./alert-context.ts";

const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alert, setAlert] = useState<AlertType>({
        isOpen: false,
        statusCode: null,
        title: null,
        message: null,
    });

    const showAlert = (props: Omit<AlertType, "isOpen">) => {
        setAlert({ ...props, isOpen: true });
    };

    const closeAlert = () => {
        setAlert((prev) => ({ ...prev, isOpen: false }));
    }

    return (
        <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertProvider;