import type React from "react"
import { useState, useEffect } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal.tsx"
import { Button } from "../ui/Button.tsx"
import { Input } from "../ui/Input.tsx"
import { Label } from "../ui/Label.tsx"
import Radio from "../ui/Radio.tsx"
import { Building2, User, MapPin, Globe, Edit } from "lucide-react"
import { formatTIN } from "../../lib/utils.ts"
import type { TINEntry } from "../../types/types.tsx"
import { validateTIN, validateName } from "../../lib/formValidators.ts";

interface EditClientProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (entry: TINEntry) => void
    entry: TINEntry | null
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
            setErrors({})
        }
    }, [entry, isOpen])

    const handleTINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatTIN(e.target.value)
        setFormData({ ...formData, tin: formatted })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!entry) return

        const newErrors: { [key: string]: string } = {};

        const nameError = validateName(formData.registeredName, formData.isIndividual ? "Individual" : "Company");
        if (nameError) {
            newErrors.registeredName = nameError;
        }

        const tinError = validateTIN(formData.tin);
        if (tinError) {
            newErrors.tin = tinError;
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length !== 0) return;

        const updatedEntry = {
            ...entry,
            ...formData,
        }

        onSubmit(updatedEntry);
        onClose();
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
                                        entry.isIndividual ? "Enter full name" : "Enter the Company Name"
                                    }
                                    required
                                    className={errors.registeredName ? "border-red-500" : ""}
                                />
                                {formData.isIndividual && (
                                    <p className="text-xs text-gray-500">
                                        Format: LastName, FirstName or LastName, FirstName, MiddleName
                                    </p>
                                )}
                                {errors.registeredName && (
                                    <p className="text-xs text-red-500">{errors.registeredName}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">TIN Number *</Label>
                                <Input
                                    value={formData.tin}
                                    onChange={handleTINChange}
                                    placeholder="xxx-xxx-xxx-xxxx"
                                    className={`font-mono ${errors.tin ? "border-red-500" : ""}`}
                                    maxLength={16} // 12 digits + 3 dashes
                                    required
                                />
                                <p className="text-xs text-gray-500">13 digits: XXX-XXX-XXX-XXXX</p>
                                {errors.tin && <p className="text-xs text-red-500">{errors.tin}</p>}
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
                    className="bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white"
                >
                    <span className="flex items-center gap-2">
                        <Edit className="w-3 h-3" />
                        {`Update ${clientType}`}
                    </span>
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default EditClient
