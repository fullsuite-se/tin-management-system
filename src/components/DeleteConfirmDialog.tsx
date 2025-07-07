"use client"

import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"

interface DeleteConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}


export default function DeleteConfirmDialog({isOpen, onConfirm, onClose}: DeleteConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md sm:mx-auto">
                <div className="text-center py-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                        Are you sure you want to remove this client to the database?
                    </h3>
                    <div className="flex justify-center space-x-3">
                        <Button variant="outline" onClick={onClose} className="px-8 bg-transparent">
                            No
                        </Button>
                        <Button onClick={onConfirm} className="bg-[#0097B2] hover:bg-[#007A94] px-8">
                            Yes
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
