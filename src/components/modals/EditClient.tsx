import type React from "react"
import { useState, useEffect } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label.tsx"
import Radio from "../ui/Radio"
import { Building2, User, MapPin, Globe, Edit} from "lucide-react" // Import the X icon

interface ClientData {
    id: string
    tin: string
    registeredName: string
    address1: string
    address2: string
    isIndividual: boolean
    isForeign: boolean
    createdAt: Date
    createdBy: string
    editedAt?: Date
    editedBy?: string
}

interface EditClientProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (entry: ClientData) => void
    entry: ClientData | null
}

const EditClient: React.FC<EditClientProps> = ({ isOpen, onClose, onSubmit, entry }) => {
    const [formData, setFormData] = useState({
        tin: "",
        registeredName: "",
        address1: "",
        address2: "",
        isIndividual: false,
        isForeign: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const locationOptions = [
        { value: "Domestic", label: "Domestic" },
        { value: "Foreign", label: "Foreign" },
    ]

    // Populate form with existing client data when modal opens
    useEffect(() => {
        if (entry && isOpen) {
            setFormData({
                tin: entry.tin,
                registeredName: entry.registeredName,
                address1: entry.address1,
                address2: entry.address2,
                isIndividual: entry.isIndividual,
                isForeign: entry.isForeign,
            })
            setError("")
        }
    }, [entry, isOpen])

    const validateTIN = (tin: string): boolean => {
        const tinRegex = /^\d{3}-\d{3}-\d{3}-\d{4}$/
        return tinRegex.test(tin)
    }

    const validateAddress = (address1: string, address2: string): boolean => {
        return address1.trim() !== "" || address2.trim() !== ""
    }

    const formatTIN = (value: string): string => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, "")
        // Limit to 12 digits
        const limited = digits.slice(0, 12)
        // Format as XXX-XXX-XXX-XXXX
        if (limited.length >= 9) {
            return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6, 9)}-${limited.slice(9)}`
        } else if (limited.length >= 6) {
            return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`
        } else if (limited.length >= 3) {
            return `${limited.slice(0, 3)}-${limited.slice(3)}`
        }
        return limited
    }

    const handleTINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatTIN(e.target.value)
        setFormData({ ...formData, tin: formatted })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!entry) return

        setIsLoading(true)
        setError("")

        try {
            // Validate TIN format (xxx-xxx-xxx-xxxx)
            if (!validateTIN(formData.tin)) {
                setError("TIN must be in format: xxx-xxx-xxx-xxxx (TIN with branch code)")
                setIsLoading(false)
                return
            }

            // Validate that at least one address field is filled
            if (!validateAddress(formData.address1, formData.address2)) {
                setError("At least one address field must be filled")
                setIsLoading(false)
                return
            }

            const updatedEntry = {
                ...entry,
                ...formData,
            }

            onSubmit(updatedEntry)
            onClose()
        } catch (error) {
            console.log(error)
            setError("Failed to update entry");
        } finally {
            setIsLoading(false)
        }
    }

    if (!entry) return null

    const clientType = entry.isIndividual ? "Individual" : "Company"
    const isCompany = !entry.isIndividual

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader onClose={onClose}> {/* Pass onClose to ModalHeader */}
                <div className="flex items-center gap-2">
                    {isCompany ? <Building2 className="w-4 h-4 text-[#0097B2]" /> : <User  className="w-4 h-4 text-[#0097B2]" />}
                    <Edit className="w-4 h-4 text-[#0097B2]" />
                    Edit {clientType} Details
                </div>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Client Type Display (Read-only) */}
                    <div className="space-y-3">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                                {isCompany ? (
                                    <Building2 className="w-4 h-4 text-[#0097B2]" />
                                ) : (
                                    <User  className="w-4 h-4 text-[#0097B2]" />
                                )}
                                <p className="text-sm text-gray-700 font-medium">
                                    Client Type: <span className="font-semibold text-[#0097B2]">{clientType}</span>
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                <p className="text-sm text-blue-800 font-medium">
                                    {entry.isIndividual
                                        ? "Update the individual client details in the database."
                                        : "Update the company details in the database."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">1</span>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs">{entry.isIndividual ? "Individual Name" : "Company Name"} *</Label>
                                <Input
                                    value={formData.registeredName}
                                    onChange={(e) => setFormData({ ...formData, registeredName: e.target.value })}
                                    placeholder={
                                        entry.isIndividual ? "Enter first name, middle name, last name" : "Enter the Company Name"
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">TIN Number *</Label>
                                <Input
                                    value={formData.tin}
                                    onChange={handleTINChange}
                                    placeholder="xxx-xxx-xxx-xxxx"
                                    className="font-mono"
                                    maxLength={15} // 12 digits + 3 dashes
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center">
                                <MapPin className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Address Information</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <Label className="text-xs">{entry.isIndividual ? "Address 1" : "Company Address 1"}</Label>
                                <Input
                                    value={formData.address1}
                                    onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                                    placeholder="Substreet, Street, Barangay"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">{entry.isIndividual ? "Address 2" : "Company Address 2"}</Label>
                                <Input
                                    value={formData.address2}
                                    onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                                    placeholder="City / Municipality, Province ZIP Code"
                                />
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                <p className="text-xs text-amber-800 font-medium">* At least one address field must be filled</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Type */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center">
                                <Globe className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">Location Type</h3>
                        </div>
                        <Radio
                            value={formData.isForeign ? "Foreign" : "Domestic"}
                            onChange={(value) => setFormData({ ...formData, isForeign: value === "Foreign" })}
                            options={locationOptions}
                            name="location"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                <p className="text-sm text-red-800 font-medium">{error}</p>
                            </div>
                        </div>
                    )}
                </form>
            </ModalBody>
            <ModalFooter>
                <Button variant="outline" size="sm" onClick={onClose} className="bg-transparent">
                    Cancel
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white"
                >
                    <span className="flex items-center gap-2">
                        <Edit className="w-3 h-3" />
                        {isLoading ? "Updating..." : `Update ${clientType}`}
                    </span>
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default EditClient
