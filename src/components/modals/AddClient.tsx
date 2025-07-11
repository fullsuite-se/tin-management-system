"use client"

import type React from "react"
import { useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Tabs from "../ui/Tabs"
import Radio from "../ui/Radio"
import { Building2, User, MapPin, Globe } from "lucide-react"

interface AddClientProps {
    isOpen: boolean
    onClose: () => void
}

const AddClient: React.FC<AddClientProps> = ({ isOpen, onClose }) => {
    const [selectedTab, setSelectedTab] = useState<string>("Individual")
    const [location, setLocation] = useState<string>("Domestic")
    const [tinNumber, setTinNumber] = useState<string>("")

    const locationOptions = [
        { value: "Domestic", label: "Domestic" },
        { value: "Foreign", label: "Foreign" },
    ]

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
        setTinNumber(formatted)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs">{selectedTab === "Company" ? "Company Name" : "Full Name"} *</Label>
                                <Input placeholder={selectedTab === "Company" ? "Enter the Company Name" : "Enter the Full Name"} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">{selectedTab === "Company" ? "TIN Number" : "ID Number"} *</Label>
                                <Input
                                    value={tinNumber}
                                    onChange={handleTINChange}
                                    placeholder="XXX-XXX-XXX-XXXX"
                                    maxLength={15} // 12 digits + 3 dashes
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
                                <Label className="text-xs">Address 1</Label>
                                <Input placeholder="Substreet, Street, Barangay" />
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs">Address 2</Label>
                                <Input placeholder="City / Municipality, Province ZIP Code" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                <p className="text-xs text-amber-800 font-medium">At least one address field must be filled</p>
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
                    className="bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white border-none"
                >
                    Cancel
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white"
                >
                <span className="flex items-center gap-2">
                  {selectedTab === "Company" ? (
                      <Building2 className="w-3 h-3" />
                  ) : (
                      <User className="w-3 h-3" />
                  )}
                    Add {selectedTab}
                </span>
                </Button>
            </ModalFooter>

        </Modal>
    )
}

export default AddClient
