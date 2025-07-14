"use client"
import type React from "react"
import { useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label.tsx"
import Tabs from "../ui/Tabs"
import Radio from "../ui/Radio"
import { Building2, User, MapPin, Globe } from "lucide-react"
import type { TINEntry } from "../../lib/types.tsx"

interface AddClientProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (newEntry: Omit<TINEntry, "id" | "createdAt" | "createdBy">) => void
}

const AddClient: React.FC<AddClientProps> = ({ isOpen, onClose, onAdd }) => {
    const [selectedTab, setSelectedTab] = useState<string>("Individual")
    const [location, setLocation] = useState<string>("Domestic")
    const [tinNumber, setTinNumber] = useState<string>("")
    const [registeredName, setRegisteredName] = useState<string>("")
    const [address1, setAddress1] = useState<string>("")
    const [address2, setAddress2] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const locationOptions = [
        { value: "Domestic", label: "Domestic" },
        { value: "Foreign", label: "Foreign" },
    ]

    const formatTIN = (value: string): string => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, "")
        // Limit to 12 digits maximum
        const limited = digits.slice(0, 12)

        // Format as XXX-XXX-XXX-XXXX (3-3-3-4)
        let formatted = ""
        for (let i = 0; i < limited.length; i++) {
            if (i === 3 || i === 6 || i === 9) {
                formatted += "-"
            }
            formatted += limited[i]
        }

        return formatted
    }

    const validateIndividualName = (name: string): boolean => {
        const commaCount = (name.match(/,/g) || []).length
        return commaCount === 2 && name.split(",").every((part) => part.trim().length > 0)
    }

    const handleTINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatTIN(e.target.value)
        setTinNumber(formatted)
        if (errors.tin) {
            setErrors((prev) => ({ ...prev, tin: "" }))
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setRegisteredName(value)

        // Clear existing errors
        if (errors.registeredName) {
            setErrors((prev) => ({ ...prev, registeredName: "" }))
        }

        // For individuals, validate comma format
        if (selectedTab === "Individual" && value.trim()) {
            if (!validateIndividualName(value)) {
                setErrors((prev) => ({
                    ...prev,
                    registeredName: "Please use format: Last name, First name, Middle name (separated by commas)",
                }))
            }
        }
    }

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {}

        // Validate registered name
        if (!registeredName.trim()) {
            newErrors.registeredName = `${selectedTab === "Company" ? "Company Name" : "Full Name"} is required`
        } else if (selectedTab === "Individual" && !validateIndividualName(registeredName)) {
            newErrors.registeredName = "Please use format: Last name, First name, Middle name (separated by commas)"
        }

        // Validate TIN
        if (!tinNumber.trim()) {
            newErrors.tin = "TIN Number is required"
        } else if (tinNumber.replace(/\D/g, "").length !== 12) {
            newErrors.tin = "TIN Number must be exactly 12 digits (XXX-XXX-XXX-XXXX)"
        }

        // Validate address (at least one field must be filled)
        if (!address1.trim() && !address2.trim()) {
            newErrors.address = "At least one address field must be filled"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            const newEntry: Omit<TINEntry, "id" | "createdAt" | "createdBy"> = {
                tin: tinNumber,
                registeredName: registeredName.trim(),
                address1: address1.trim(),
                address2: address2.trim(),
                isIndividual: selectedTab === "Individual",
                isForeign: location === "Foreign",
            }

            onAdd(newEntry)
            handleClose()
        } catch (error) {
            console.error("Error adding client:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        // Reset form
        setSelectedTab("Individual")
        setLocation("Domestic")
        setTinNumber("")
        setRegisteredName("")
        setAddress1("")
        setAddress2("")
        setErrors({})
        setIsSubmitting(false)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalHeader onClose={handleClose}>
                <div className="flex items-center gap-2">
                    {selectedTab === "Company" ? (
                        <Building2 className="w-4 h-4 text-[#0097B2]" />
                    ) : (
                        <User className="w-4 h-4 text-[#0097B2]" />
                    )}
                    Add New Client
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    {/* Client Type Selection */}
                    <div className="space-y-3">
                        <Tabs active={selectedTab} onChange={setSelectedTab} options={["Company", "Individual"]} />
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                <p className="text-sm text-blue-800 font-medium">
                                    Enter the {selectedTab.toLowerCase()} details to add to the database.
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

                        {/* Name Field - Full Width */}
                        <div className="space-y-1">
                            <Label className="text-xs">{selectedTab === "Company" ? "Company Name" : "Full Name"} *</Label>
                            <Input
                                value={registeredName}
                                onChange={handleNameChange}
                                placeholder={selectedTab === "Company" ? "Enter the Company Name" : "e.g. Dela Cruz, Juan, Santos"}
                                className={errors.registeredName ? "border-red-500" : ""}
                            />
                            {selectedTab === "Individual" && (
                                <p className="text-xs text-gray-500">Use commas to separate: Last name, First name, Middle name</p>
                            )}
                            {errors.registeredName && <p className="text-xs text-red-500">{errors.registeredName}</p>}
                        </div>

                        {/* TIN Field - Full Width */}
                        <div className="space-y-1">
                            <Label className="text-xs">TIN Number *</Label>
                            <Input
                                value={tinNumber}
                                onChange={handleTINChange}
                                placeholder="e.g. 000-000-000-0000"
                                maxLength={15} // 12 digits + 3 dashes
                                className={errors.tin ? "border-red-500" : ""}
                            />
                            <p className="text-xs text-gray-500">Enter 12 digits in format: XXX-XXX-XXX-XXXX</p>
                            {errors.tin && <p className="text-xs text-red-500">{errors.tin}</p>}
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
                                <Label className="text-xs">Address 1</Label>
                                <Input
                                    value={address1}
                                    onChange={(e) => {
                                        setAddress1(e.target.value)
                                        if (errors.address) {
                                            setErrors((prev) => ({ ...prev, address: "" }))
                                        }
                                    }}
                                    placeholder="Substreet, Street, Barangay"
                                    className={errors.address ? "border-red-500" : ""}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Address 2</Label>
                                <Input
                                    value={address2}
                                    onChange={(e) => {
                                        setAddress2(e.target.value)
                                        if (errors.address) {
                                            setErrors((prev) => ({ ...prev, address: "" }))
                                        }
                                    }}
                                    placeholder="City / Municipality, Province ZIP Code"
                                    className={errors.address ? "border-red-500" : ""}
                                />
                            </div>
                        </div>
                        <div
                            className={`bg-gradient-to-r rounded-xl p-3 ${errors.address ? "from-red-50 to-red-50 border border-red-200" : "from-amber-50 to-orange-50 border border-amber-200"}`}
                        >
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${errors.address ? "bg-red-500" : "bg-amber-500"}`} />
                                <p className={`text-xs font-medium ${errors.address ? "text-red-800" : "text-amber-800"}`}>
                                    {errors.address || "At least one address field must be filled"}
                                </p>
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
                        <Radio value={location} onChange={setLocation} options={locationOptions} name="location" />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white border-none"
                >
                    Cancel
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white"
                >
          <span className="flex items-center gap-2">
            {selectedTab === "Company" ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
              {isSubmitting ? "Adding..." : `Add ${selectedTab}`}
          </span>
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AddClient
