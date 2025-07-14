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

    const isCompany = selectedTab === "Company"
    const isIndividual = selectedTab === "Individual"
    const isMobile = "sm:hidden"
    const isDesktop = "hidden sm:block"

    const formatTIN = (value: string): string => {
        const digits = value.replace(/\D/g, "").slice(0, 12)
        let formatted = ""
        for (let i = 0; i < digits.length; i++) {
            if (i === 3 || i === 6 || i === 9) formatted += "-"
            formatted += digits[i]
        }
        return formatted
    }

    const validateIndividualName = (name: string): boolean => {
        const commaCount = (name.match(/,/g) || []).length
        return commaCount === 2 && name.split(",").every((part) => part.trim().length > 0)
    }

    const handleTINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTinNumber(formatTIN(e.target.value))
        if (errors.tin) setErrors((prev) => ({ ...prev, tin: "" }))
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setRegisteredName(value)
        if (errors.registeredName) setErrors((prev) => ({ ...prev, registeredName: "" }))

        if (isIndividual && value.trim() && !validateIndividualName(value)) {
            setErrors((prev) => ({
                ...prev,
                registeredName: "Please use format: Last name, First name, Middle name (separated by commas)",
            }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {}

        if (!registeredName.trim()) {
            newErrors.registeredName = `${isCompany ? "Company Name" : "Full Name"} is required`
        } else if (isIndividual && !validateIndividualName(registeredName)) {
            newErrors.registeredName = "Please use format: Last name, First name, Middle name (separated by commas)"
        }

        if (!tinNumber.trim()) {
            newErrors.tin = "TIN Number is required"
        } else if (tinNumber.replace(/\D/g, "").length !== 12) {
            newErrors.tin = "TIN Number must be exactly 12 digits (XXX-XXX-XXX-XXXX)"
        }

        if (!address1.trim() && !address2.trim()) {
            newErrors.address = "At least one address field must be filled"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            onAdd({
                tin: tinNumber,
                registeredName: registeredName.trim(),
                address1: address1.trim(),
                address2: address2.trim(),
                isIndividual,
                isForeign: location === "Foreign",
            })
            handleClose()
        } catch (error) {
            console.error("Error adding client:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
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

    const handleAddressChange = (field: "address1" | "address2") => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (field === "address1") setAddress1(e.target.value)
        else setAddress2(e.target.value)
        if (errors.address) setErrors((prev) => ({ ...prev, address: "" }))
    }

    const FormContent = ({ mobile = false }: { mobile?: boolean }) => {
        const spacing = mobile ? "space-y-2" : "space-y-3"
        const textSize = mobile ? "text-xs" : "text-sm"
        const iconSize = mobile ? "w-4 h-4" : "w-5 h-5"
        const smallIconSize = mobile ? "w-2 h-2" : "w-2.5 h-2.5"
        const dotSize = mobile ? "w-1.5 h-1.5" : "w-1.5 h-1.5"

        return (
            <div className={spacing}>
                {/* Client Type Selection */}
                <div className="space-y-2">
                    <Tabs active={selectedTab} onChange={setSelectedTab} options={["Company", "Individual"]} />
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                            <div className={`${dotSize} bg-blue-500 rounded-full flex-shrink-0`} />
                            <p className={`${textSize} text-blue-800 font-medium`}>
                                Enter the {selectedTab.toLowerCase()} details to add to the database.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div
                            className={`${iconSize} bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                            <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <h3 className={`${mobile ? "text-xs" : "text-sm"} font-semibold text-gray-900`}>Basic Information</h3>
                    </div>

                    <div className="space-y-2">
                        <div>
                            <Label className="text-xs font-medium">{isCompany ? "Company Name" : "Full Name"} *</Label>
                            <Input
                                value={registeredName}
                                onChange={handleNameChange}
                                placeholder={
                                    isCompany ? (mobile ? "Enter Company Name" : "Enter the Company Name") : "Dela Cruz, Juan, Santos"
                                }
                                className={`w-full ${textSize} mt-1 ${errors.registeredName ? "border-red-500" : ""}`}
                            />
                            {isIndividual && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {mobile
                                        ? "Use commas: Last, First, Middle"
                                        : "Use commas to separate: Last name, First name, Middle name"}
                                </p>
                            )}
                            {errors.registeredName && (
                                <p className="text-xs text-red-500 mt-1">
                                    {mobile ? "Required format with commas" : errors.registeredName}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="text-xs font-medium">TIN Number *</Label>
                            <Input
                                value={tinNumber}
                                onChange={handleTINChange}
                                placeholder="111-111-111-1111"
                                maxLength={15}
                                className={`w-full ${textSize} font-mono mt-1 ${errors.tin ? "border-red-500" : ""}`}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {mobile ? "Format: XXX-XXX-XXX-XXXX" : "Enter 12 digits in format: XXX-XXX-XXX-XXXX"}
                            </p>
                            {errors.tin && <p className="text-xs text-red-500 mt-1">{mobile ? "12 digits required" : errors.tin}</p>}
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div
                            className={`${iconSize} bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                            <MapPin className={`${smallIconSize} text-white`} />
                        </div>
                        <h3 className={`${mobile ? "text-xs" : "text-sm"} font-semibold text-gray-900`}>Address Information</h3>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <Label className="text-xs font-medium">Address 1</Label>
                            <Input
                                value={address1}
                                onChange={handleAddressChange("address1")}
                                placeholder={mobile ? "Street, Barangay" : "Substreet, Street, Barangay"}
                                className={`w-full ${textSize} mt-1 ${errors.address ? "border-red-500" : ""}`}
                            />
                        </div>
                        <div>
                            <Label className="text-xs font-medium">Address 2</Label>
                            <Input
                                value={address2}
                                onChange={handleAddressChange("address2")}
                                placeholder={mobile ? "City, Province ZIP" : "City / Municipality, Province ZIP Code"}
                                className={`w-full ${textSize} mt-1 ${errors.address ? "border-red-500" : ""}`}
                            />
                        </div>
                    </div>
                    <div
                        className={`bg-gradient-to-r rounded-lg p-2 ${errors.address ? "from-red-50 to-red-50 border border-red-200" : "from-amber-50 to-orange-50 border border-amber-200"}`}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`${dotSize} rounded-full ${errors.address ? "bg-red-500" : "bg-amber-500"}`} />
                            <p className={`text-xs font-medium ${errors.address ? "text-red-800" : "text-amber-800"}`}>
                                {errors.address || (mobile ? "Fill at least one address" : "At least one address field must be filled")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Location Type */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div
                            className={`${iconSize} bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                            <Globe className={`${smallIconSize} text-white`} />
                        </div>
                        <h3 className={`${mobile ? "text-xs" : "text-sm"} font-semibold text-gray-900`}>Location Type</h3>
                    </div>
                    <Radio
                        value={location}
                        onChange={setLocation}
                        options={[
                            { value: "Domestic", label: "Domestic" },
                            { value: "Foreign", label: "Foreign" },
                        ]}
                        name="location"
                    />
                </div>
            </div>
        )
    }

    const ActionButtons = ({ mobile = false }: { mobile?: boolean }) => {
        const ButtonIcon = isCompany ? Building2 : User

        if (mobile) {
            return (
                <div className="flex flex-col gap-2 p-3 border-t border-gray-200">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white py-2"
                    >
            <span className="flex items-center justify-center gap-2">
              <ButtonIcon className="w-3 h-3" />
                {isSubmitting ? "Adding..." : `Add ${selectedTab}`}
            </span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="w-full border-gray-300 text-gray-700 py-2 bg-transparent"
                    >
                        Cancel
                    </Button>
                </div>
            )
        }

        return (
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
            <ButtonIcon className="w-3 h-3" />
              {isSubmitting ? "Adding..." : `Add ${selectedTab}`}
          </span>
                </Button>
            </ModalFooter>
        )
    }

    return (
        <>
            {/* Desktop Modal */}
            <div className={isDesktop}>
                <Modal isOpen={isOpen} onClose={handleClose}>
                    <ModalHeader onClose={handleClose}>
                        <div className="flex items-center gap-2">
                            {isCompany ? (
                                <Building2 className="w-4 h-4 text-[#0097B2]" />
                            ) : (
                                <User className="w-4 h-4 text-[#0097B2]" />
                            )}
                            Add New Client
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormContent />
                    </ModalBody>
                    <ActionButtons />
                </Modal>
            </div>

            {/* Mobile Modal */}
            <div className={`${isMobile} fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose} />
                <div className="fixed inset-0 flex items-center justify-center p-3">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                        <div className="flex items-center justify-between p-3 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                {isCompany ? (
                                    <Building2 className="w-4 h-4 text-[#0097B2]" />
                                ) : (
                                    <User className="w-4 h-4 text-[#0097B2]" />
                                )}
                                <h2 className="text-base font-semibold">Add New Client</h2>
                            </div>
                            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3">
                            <FormContent mobile />
                        </div>
                        <ActionButtons mobile />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClient
