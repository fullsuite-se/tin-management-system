import React from "react";
import { Button } from "./ui/Button";
import useAlert from "../hooks/use-alert.ts"

const Alert: React.FC = () => {
    const { alert, closeAlert } = useAlert();

    if (!alert.isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div>
                <div>
                    {alert.statusCode}
                </div>
                <span>{alert.title}</span>
            </div>
            <p>{alert.message}</p>
            <Button
                onClick={closeAlert}
                size="sm"
            >
                OK
            </Button>
        </div>
    );
}

export default Alert;