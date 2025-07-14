import type * as React from "react"
import { useState, useEffect } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import Tabs from "../ui/Tabs"
import Radio from "../ui/Radio"
import { Building2, User, MapPin, Globe, ChevronLeft, ChevronRight } from "lucide-react"
import type { TINEntry } from "../../lib/types"

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
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    const locationOptions = [
        { value: "Domestic", label: "Domestic" },
        { value: "Foreign", label: "Foreign" },
    ]

    const steps = [
        { id: 0, title: "Client Type", icon: selectedTab === "Company" ? Building2 : User },
        { id: 1, title: "Basic Info", icon: User },
        { id: 2, title: "Address", icon: MapPin },
        { id: 3, title: "Location", icon: Globe },
    ]

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const formatTIN = (value: string): string => {
        const digits = value.replace(/\D/g, "").slice(0, 13)
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
        if (selectedTab === "Individual" && value.trim() && !validateIndividualName(value)) {
            setErrors((prev) => ({
                ...prev,
                registeredName: "Please use format: Last name, First name, Middle name (separated by commas)",
            }))
        }
    }

    const validateCurrentStep = (): boolean => {
        const newErrors: { [key: string]: string } = {}

        if (currentStep === 1) {
            if (!registeredName.trim()) {
                newErrors.registeredName = `${selectedTab === "Company" ? "Company Name" : "Full Name"} is required`
            } else if (selectedTab === "Individual" && !validateIndividualName(registeredName)) {
                newErrors.registeredName = "Please use format: Last name, First name, Middle name (separated by commas)"
            }

            if (!tinNumber.trim()) {
                newErrors.tin = "TIN Number is required"
            } else if (tinNumber.replace(/\D/g, "").length !== 13) {
                newErrors.tin = "TIN Number must be exactly  13 digits (XXX-XXX-XXX-XXXX)"
            }
        } else if (currentStep === 2) {
            if (!address1.trim() && !address2.trim()) {
                newErrors.address = "At least one address field must be filled"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {}

        if (!registeredName.trim()) {
            newErrors.registeredName = `${selectedTab === "Company" ? "Company Name" : "Full Name"} is required`
        } else if (selectedTab === "Individual" && !validateIndividualName(registeredName)) {
            newErrors.registeredName = "Please use format: Last name, First name, Middle name (separated by commas)"
        }

        if (!tinNumber.trim()) {
            newErrors.tin = "TIN Number is required"
        } else if (tinNumber.replace(/\D/g, "").length !== 13) {
            newErrors.tin = "TIN Number must be exactly 13 digits (XXX-XXX-XXX-XXXX)"
        }

        if (!address1.trim() && !address2.trim()) {
            newErrors.address = "At least one address field must be filled"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (isMobile && validateCurrentStep()) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
        }
    }

    const handlePrevious = () => {
        if (isMobile) setCurrentStep((prev) => Math.max(prev - 1, 0))
    }

    const handleSubmit = async () => {
        if (!validateForm()) return

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
        setSelectedTab("Individual")
        setLocation("Domestic")
        setTinNumber("")
        setRegisteredName("")
        setAddress1("")
        setAddress2("")
        setErrors({})
        setIsSubmitting(false)
        setCurrentStep(0)
        onClose()
    }

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Client Type</h3>
                            <p className="text-sm text-gray-600">Choose whether you're adding a company or individual</p>
                        </div>
                        <Tabs active={selectedTab} onChange={setSelectedTab} options={["Company", "Individual"]} />
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                <p className="text-sm text-blue-800 font-medium">
                                    Enter the {selectedTab.toLowerCase()} details to add to the database.
                                </p>
                            </div>
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Information</h3>
                            <p className="text-sm text-gray-600">Enter the {selectedTab.toLowerCase()} name and TIN number</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>{selectedTab === "Company" ? "Company Name" : "Full Name"} *</Label>
                                <Input
                                    value={registeredName}
                                    onChange={handleNameChange}
                                    placeholder={selectedTab === "Company" ? "Enter the Company Name" : "Dela Cruz, Juan, Santos"}
                                    className={errors.registeredName ? "border-red-500" : ""}
                                />
                                {selectedTab === "Individual" && (
                                    <p className="text-xs text-gray-500">Use commas to separate: Last name, First name, Middle name</p>
                                )}
                                {errors.registeredName && <p className="text-xs text-red-500">{errors.registeredName}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>TIN Number *</Label>
                                <Input
                                    value={tinNumber}
                                    onChange={handleTINChange}
                                    placeholder="111-111-111-1111"
                                    maxLength={15}
                                    className={`font-mono ${errors.tin ? "border-red-500" : ""}`}
                                />
                                <p className="text-xs text-gray-500">Enter 13 digits in format: XXX-XXX-XXX-XXXX</p>
                                {errors.tin && <p className="text-xs text-red-500">{errors.tin}</p>}
                            </div>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Address Information</h3>
                            <p className="text-sm text-gray-600">Enter the address details</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Address 1</Label>
                                <Input
                                    value={address1}
                                    onChange={(e) => {
                                        setAddress1(e.target.value)
                                        if (errors.address) setErrors((prev) => ({ ...prev, address: "" }))
                                    }}
                                    placeholder="Substreet, Street, Barangay"
                                    className={errors.address ? "border-red-500" : ""}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Address 2</Label>
                                <Input
                                    value={address2}
                                    onChange={(e) => {
                                        setAddress2(e.target.value)
                                        if (errors.address) setErrors((prev) => ({ ...prev, address: "" }))
                                    }}
                                    placeholder="City / Municipality, Province ZIP Code"
                                    className={errors.address ? "border-red-500" : ""}
                                />
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
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Type</h3>
                            <p className="text-sm text-gray-600">Select if this is a domestic or foreign client</p>
                        </div>
                        <Radio value={location} onChange={setLocation} options={locationOptions} name="location" />
                    </div>
                )
            default:
                return null
        }
    }

    const renderDesktopContent = () => (
        <div className="space-y-4">
            <div className="space-y-3">
                <Tabs active={selectedTab} onChange={setSelectedTab} options={["Company", "Individual"]} />
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        <p className="text-sm text-blue-800 font-medium">
                            Enter the {selectedTab.toLowerCase()} details to add to the database.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
                </div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label>{selectedTab === "Company" ? "Company Name" : "Full Name"} *</Label>
                        <Input
                            value={registeredName}
                            onChange={handleNameChange}
                            placeholder={selectedTab === "Company" ? "Enter the Company Name" : "Dela Cruz, Juan, Santos"}
                            className={errors.registeredName ? "border-red-500" : ""}
                        />
                        {selectedTab === "Individual" && (
                            <p className="text-xs text-gray-500">Use commas to separate: Last name, First name, Middle name</p>
                        )}
                        {errors.registeredName && <p className="text-xs text-red-500">{errors.registeredName}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label>TIN Number *</Label>
                        <Input
                            value={tinNumber}
                            onChange={handleTINChange}
                            placeholder="111-111-111-1111"
                            maxLength={13}
                            className={`font-mono ${errors.tin ? "border-red-500" : ""}`}
                        />
                        <p className="text-xs text-gray-500">Enter 13 digits in format: XXX-XXX-XXX-XXXX</p>
                        {errors.tin && <p className="text-xs text-red-500">{errors.tin}</p>}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">Address Information</h3>
                </div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label>Address 1</Label>
                        <Input
                            value={address1}
                            onChange={(e) => {
                                setAddress1(e.target.value)
                                if (errors.address) setErrors((prev) => ({ ...prev, address: "" }))
                            }}
                            placeholder="Substreet, Street, Barangay"
                            className={errors.address ? "border-red-500" : ""}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Address 2</Label>
                        <Input
                            value={address2}
                            onChange={(e) => {
                                setAddress2(e.target.value)
                                if (errors.address) setErrors((prev) => ({ ...prev, address: "" }))
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
    )

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
                    {isMobile && (
                        <span className="ml-auto text-xs text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
                    )}
                </div>
            </ModalHeader>

            {isMobile && (
                <div className="px-4 py-2 border-b">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <div key={step.id} className="flex items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            index <= currentStep
                                                ? "bg-gradient-to-r from-[#0097B2] to-[#00B4D8] text-white"
                                                : "bg-gray-200 text-gray-400"
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-8 h-0.5 mx-1 ${index < currentStep ? "bg-[#0097B2]" : "bg-gray-200"}`} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            <ModalBody>
                {isMobile ? (
                    <div className="min-h-[400px] flex flex-col">{renderStepContent(currentStep)}</div>
                ) : (
                    renderDesktopContent()
                )}
            </ModalBody>

            <ModalFooter>
                {isMobile ? (
                    <div className="flex items-center justify-between w-full gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={currentStep === 0 ? handleClose : handlePrevious}
                            disabled={isSubmitting}
                        >
                            {currentStep === 0 ? (
                                "Cancel"
                            ) : (
                                <>
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Back
                                </>
                            )}
                        </Button>

                        {currentStep === steps.length - 1 ? (
                            <Button variant="default" size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                                {selectedTab === "Company" ? <Building2 className="w-4 h-4 mr-1" /> : <User className="w-4 h-4 mr-1" />}
                                {isSubmitting ? "Adding..." : `Add ${selectedTab}`}
                            </Button>
                        ) : (
                            <Button variant="default" size="sm" onClick={handleNext}>
                                Next
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={handleClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button variant="default" size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                            {selectedTab === "Company" ? <Building2 className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                            {isSubmitting ? "Adding..." : `Add ${selectedTab}`}
                        </Button>
                    </div>
                )}
            </ModalFooter>
        </Modal>
    )
}

export default AddClient
