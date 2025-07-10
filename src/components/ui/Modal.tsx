import { cn } from "../../lib/utils.ts";

interface MainModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

interface ModalProps {
    children: React.ReactNode;
    className?: string;
}

const Modal: React.FC<MainModalProps> = ({ isOpen, onClose, children, className }) => {
    if (!isOpen) return null;

    return (
        <div
            className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center", className)}
            onClick={onClose} // optional close on background click
        >
            <div
                className="bg-white w-full max-w-lg rounded-xl shadow-lg"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking the modal itself
            >
                {children}
            </div>
        </div>
    );
}

const ModalHeader: React.FC<ModalProps> = ({ children, className }) => {
    return (
        <div className={cn("flex items-center justify-between p-3 bg-white border-b border-gray-300 rounded-t-xl", className)}>
            {children}
        </div>
    );
}

const ModalBody: React.FC<ModalProps> = ({ children, className }) => {
    return (
        <div className={cn("p-3", className)}>
            {children}
        </div>
    )
}

const ModalFooter: React.FC<ModalProps> = ({ children, className }) => {
    return (
        <div className={cn("flex justify-end p-3 bg-white border-t border-gray-300 rounded-b-xl", className)}>
            {children}
        </div>
    )
}

export {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
}