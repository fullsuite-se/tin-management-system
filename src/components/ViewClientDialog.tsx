"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/Button.tsx"
import type { TINEntry } from "../lib/types"
import { formatDate } from "../lib/utils.ts"
import { MapPin, Calendar, User, Building2 } from "lucide-react"

interface ViewClientDialogProps {
    isOpen: boolean
    onClose: () => void
    entry: TINEntry | null
}

export default function ViewClientDialog({ isOpen, onClose, entry }: ViewClientDialogProps) {
    if (!entry) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-semibold text-[#0097B2] break-words flex items-center">
                        {entry.isIndividual ? (
                            <User className="h-5 w-5 mr-2 flex-shrink-0" />
                        ) : (
                            <Building2 className="h-5 w-5 mr-2 flex-shrink-0" />
                        )}
                        {entry.registeredName}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-6">
                    {/* Client Type Badges */}
                    <div className="flex flex-wrap gap-2">
            <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                    entry.isIndividual
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-purple-100 text-purple-800 border border-purple-200"
                }`}
            >
              {entry.isIndividual ? "Individual" : "Company"}
            </span>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                entry.isForeign
                                    ? "bg-orange-100 text-orange-800 border border-orange-200"
                                    : "bg-green-100 text-green-800 border border-green-200"
                            }`}
                        >
              {entry.isForeign ? "Foreign" : "Domestic"}
            </span>
                    </div>

                    {/* TIN Number */}
                    <div className="text-center bg-gray-50 rounded-lg p-4">
                        <div className="text-xs text-gray-500 mb-1">TIN Number</div>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 font-mono break-all">{entry.tin}</div>
                    </div>

                    {/* Address Information */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                            <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-blue-800">Address Information</span>
                        </div>
                        <div className="space-y-2 text-gray-700">
                            {entry.address1 && <div className="break-words">{entry.address1}</div>}
                            {entry.address2 && <div className="break-words">{entry.address2}</div>}
                            {!entry.address1 && !entry.address2 && (
                                <div className="text-gray-500 italic">No address information available</div>
                            )}
                        </div>
                    </div>

                    {/* Record Metadata */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                            <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                            <span className="text-sm font-medium text-gray-800">Record Information</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                                <span className="text-gray-600 font-medium">Added by:</span>
                                <span className="font-medium break-words">{entry.createdBy}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                                <span className="text-gray-600 font-medium">Added on:</span>
                                <span className="font-medium">{formatDate(entry.createdAt)}</span>
                            </div>
                            {entry.editedBy && entry.editedAt && (
                                <>
                                    <hr className="border-gray-200" />
                                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                                        <span className="text-gray-600 font-medium">Last edited by:</span>
                                        <span className="font-medium break-words">{entry.editedBy}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                                        <span className="text-gray-600 font-medium">Last edited on:</span>
                                        <span className="font-medium">{formatDate(entry.editedAt)}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <Button onClick={onClose} className="bg-[#0097B2] hover:bg-[#007A94] w-full sm:w-auto">
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
