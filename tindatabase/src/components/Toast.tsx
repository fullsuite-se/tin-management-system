import React from "react";
import useToast from "../hooks/use-toast.ts";

const Toast: React.FC = () => {
    const { toast } = useToast();

    if (!toast.isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-black border-l-4 border-[#AFE0EA] shadow-lg z-50 p-4 rounded">
            <div className="flex items-center">
                <span className="text-[#AFE0EA] font-bold">{toast.title}</span>
                <span className="ml-2 text-white">{toast.message}</span>
            </div>
        </div>
    );
}

export default Toast;
