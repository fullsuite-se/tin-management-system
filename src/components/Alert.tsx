import React from "react";
import { Button } from "./ui/Button";
import useAlert from "../hooks/use-alert.ts";
import { AlertCircle } from "lucide-react";

const Alert: React.FC = () => {
    const { alert, closeAlert } = useAlert();

    if (!alert.isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-[#ffefea] border border-[#f5c6cb] rounded-md shadow-md w-full max-w-md p-6">
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-[#d8000c]" />
                        <h3 className="text-sm font-semibold text-black">
                            {alert.title}
                        </h3>
                    </div>
                    {alert.statusCode && (
                        <span className="text-[#d8000c] text-sm font-semibold">
                            {alert.statusCode}
                        </span>
                    )}
                </div>
                <p className="text-sm text-[#333] mt-2">
                    {alert.message}
                </p>
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={closeAlert}
                        size="sm"
                        className="bg-white text-[#d8000c] border border-[#d8000c] text-sm rounded px-2 py-1 hover:bg-[#d8000c] hover:text-white active:bg-[#d8000c] active:text-white"
                    >
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
