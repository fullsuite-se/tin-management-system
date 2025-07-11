"use client"

import type React from "react"
import { Calendar, MapPin, User, Building2, Edit } from "lucide-react"
import type { TINEntry } from "../../lib/types"
import { formatDate } from "../../lib/utils"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"

interface ViewClientDialogProps {
    isOpen: boolean
    onClose: () => void
    entry: TINEntry | null
}

const ViewClientDialog: React.FC<ViewClientDialogProps> = ({ isOpen, onClose, entry }) => {
    if (!entry) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>
                <div className="flex items-center gap-2 text-[#0097B2]">
                    {entry.isIndividual ? (
                        <User className="w-5 h-5" />
                    ) : (
                        <Building2 className="w-5 h-5" />
                    )}
                    <span className="text-lg sm:text-xl font-semibold break-words">
                        {entry.registeredName}
                    </span>
                </div>
            </ModalHeader>

            <ModalBody>
                <div className="space-y-4 sm:space-y-6">

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${entry.isIndividual ? "bg-blue-100 text-blue-800 border border-blue-200" : "bg-purple-100 text-purple-800 border border-purple-200"}`}>
                            {entry.isIndividual ? "Individual" : "Company"}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${entry.isForeign ? "bg-orange-100 text-orange-800 border border-orange-200" : "bg-green-100 text-green-800 border border-green-200"}`}>
                            {entry.isForeign ? "Foreign" : "Domestic"}
                        </span>
                    </div>

                    {/* TIN */}
                    <div className="text-center bg-gray-50 rounded-lg p-4">
                        <div className="text-xs text-gray-500 mb-1">TIN Number</div>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 font-mono break-all">
                            {entry.tin}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                            <MapPin className="w-4 h-4 text-blue-600 mr-2" />
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

                    {/* Metadata */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                            <Calendar className="w-4 h-4 text-gray-600 mr-2" />
                            <span className="text-sm font-medium text-gray-800">Record Information</span>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                <span className="text-gray-600 font-medium">Added by:</span>
                                <span className="font-medium break-words">{entry.createdBy}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                <span className="text-gray-600 font-medium">Added on:</span>
                                <span className="font-medium">{formatDate(entry.createdAt)}</span>
                            </div>

                            {entry.editedBy && entry.editedAt && (
                                <>
                                    <hr className="border-gray-200" />
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                        <span className="text-gray-600 font-medium">Last edited by:</span>
                                        <span className="font-medium break-words">{entry.editedBy}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                        <span className="text-gray-600 font-medium">Last edited on:</span>
                                        <span className="font-medium">{formatDate(entry.editedAt)}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button
                    variant="default"
                    size="sm"
                    onClick={onClose}
                    className="bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white w-full sm:w-auto"
                >
                    <span className="flex items-center gap-2">
                        <Edit className="w-3 h-3" />
                        Close
                    </span>
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ViewClientDialog
