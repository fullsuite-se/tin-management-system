import type React from "react"
import { Calendar, MapPin, User, Building2, Edit } from "lucide-react" // Import the X icon
import type { TINEntry } from "../../types/types.tsx"
import { formatDate } from "../../lib/utils.ts"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal.tsx"
import { Button } from "../ui/Button.tsx"

interface ViewClientDialogProps {
    isOpen: boolean
    onClose: () => void
    entry: TINEntry | null
}

const ViewClientDialog: React.FC<ViewClientDialogProps> = ({ isOpen, onClose, entry }) => {
    if (!entry) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader onClose={onClose}> {/* Pass onClose to ModalHeader */}
                <div className="flex items-center gap-2 text-gray-900">
                    {entry.isIndividual ? (
                        <User  className="w-5 h-5" />
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
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${entry.isIndividual ? "bg-slate-100 text-slate-700 border border-slate-200" : "bg-slate-100 text-slate-700 border border-slate-200"}`}>
                            {entry.isIndividual ? "Individual" : "Company"}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${entry.isForeign ? "bg-slate-100 text-slate-700 border border-slate-200" : "bg-slate-100 text-slate-700 border border-slate-200"}`}>
                            {entry.isForeign ? "Foreign" : "Domestic"}
                        </span>
                    </div>

                    {/* TIN */}
                    <div className="text-center bg-gray-50 rounded-lg p-4">
                        <div className="text-xs text-gray-500 mb-1">TIN Number</div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono break-all bg-gradient-to-r from-[#0097B2] to-[#00B4D8] bg-clip-text text-transparent">
                            {entry.tin}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-cyan-50/50  border rounded-lg p-4">
                        <div className="flex items-center mb-3">
                            <MapPin className="w-4 h-4 text-gray mr-2" />
                            <span className="text-sm font-medium text-gray-800">Address Information</span>
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
                                <span className="font-medium">{formatDate(new Date(entry.createdAt))}</span>
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
                                        <span className="font-medium">{formatDate(new Date(entry.editedAt))}</span>
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
