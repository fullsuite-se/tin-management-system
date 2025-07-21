"use client"

import type React from "react"
import { cn } from "../../lib/utils"
import { X } from "lucide-react"

interface MainModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

interface ModalProps {
    children: React.ReactNode
    className?: string
}

const Modal: React.FC<MainModalProps> = ({ isOpen, onClose, children, className }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop layer */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal content */}
            <div
                className={cn(
                    "relative z-60 flex items-center justify-center min-h-screen p-4",
                    className
                )}
            >
                <div
                    className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    onClose?: () => void
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className, onClose }) => (
    <div
        className={cn(
            "flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 rounded-t-2xl",
            className,
        )}
    >
        <h2 className="text-lg font-bold text-gray-900">{children}</h2>
        {onClose && (
            <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                aria-label="Close modal"
            >
                <X className="w-4 h-4" />
            </button>
        )}
    </div>
)


const ModalBody: React.FC<ModalProps> = ({ children, className }) => (
    <div className={cn("px-6 py-4", className)}>{children}</div>
)

const ModalFooter: React.FC<ModalProps> = ({ children, className }) => (
    <div
        className={cn(
            "flex justify-end gap-3 px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 rounded-b-2xl",
            className,
        )}
    >
        {children}
    </div>
)

export { Modal, ModalHeader, ModalBody, ModalFooter }
