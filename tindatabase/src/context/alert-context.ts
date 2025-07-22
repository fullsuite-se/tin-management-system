import {createContext} from "react";

type AlertType = {
    isOpen: boolean,
    statusCode: number | null,
    title: string | null,
    message: string | null,
}

type AlertContextType = {
    alert: AlertType,
    showAlert: (props: Omit<AlertType, "isOpen">) => void;
    closeAlert: () => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);
export type { AlertType, AlertContextType }