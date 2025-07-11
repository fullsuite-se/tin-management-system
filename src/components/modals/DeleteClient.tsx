"use client"

import { Button } from "../../components/ui/Button"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../../components/ui/Modal"
import type { TINEntry } from "../../lib/types"

interface DeleteClientDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    entry: TINEntry | null
}

export default function DeleteClientDialog({ isOpen, onClose, onConfirm, entry }: DeleteClientDialogProps) {
    if (!entry) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>
                Delete Client
            </ModalHeader>

            <ModalBody>
                {/* Client Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center text-white font-medium">
                            {entry.registeredName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 break-words">{entry.registeredName}</h3>
                            <p className="text-sm text-gray-600 font-mono">{entry.tin}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              {entry.isIndividual ? "Individual" : "Company"}
            </span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              {entry.isForeign ? "Foreign" : "Domestic"}
            </span>
                    </div>
                </div>

                {/* Warning */}
                <div className="text-center">
                    <div className="text-red-600 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Are you sure?</h3>
                    <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                        This action cannot be undone. This will permanently delete the client record and all associated data from
                        the database.
                    </p>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onConfirm} className="w-full sm:w-auto">
                    Delete Client
                </Button>
            </ModalFooter>
        </Modal>
    )
}
