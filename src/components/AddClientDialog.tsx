// src/components/AddClientDialog.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { TINEntry } from "../lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { validateTIN, validateAddress } from "../lib/utils"

interface AddClientDialogProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (entry: Omit<TINEntry, "id" | "createdAt" | "createdBy">) => void
}

export default function AddClientDialog({ isOpen, onClose, onSubmit }: AddClientDialogProps) {
    const [activeTab, setActiveTab] = useState("company")
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

    useEffect(() => {
        if (isOpen) {
            // Reset form when dialog opens
            setFormData({
                tin: "",
                registeredName: "",
                address1: "",
                address2: "",
                isIndividual: false,
                isForeign: false,
            })
            setActiveTab("company")
            setError("")
        }
    }, [isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
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

            const submissionData = {
                ...formData,
                isIndividual: activeTab === "individual",
            }

            onSubmit(submissionData)
            onClose()
        } catch (error) {
            console.log(error)
            setError("Failed to save entry")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-semibold">Add New Client</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="company">Company</TabsTrigger>
                            <TabsTrigger value="individual">Individual</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="text-sm text-gray-600">
                        {activeTab === "company"
                            ? "Enter the company details to add to the database."
                            : "Enter the individual client details to add to the database."}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                {activeTab === "company" ? "Company Name" : "Individual Name"} *
                            </Label>
                            <Input
                                id="name"
                                value={formData.registeredName}
                                onChange={(e) => setFormData({ ...formData, registeredName: e.target.value })}
                                placeholder={
                                    activeTab === "company" ? "Enter the Company Name" : "Enter first name, middle name, last name"
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tin" className="text-sm font-medium text-gray-700">
                                TIN Number *
                            </Label>
                            <Input
                                id="tin"
                                value={formData.tin}
                                onChange={(e) => setFormData({ ...formData, tin: e.target.value })}
                                placeholder="xxx-xxx-xxx-xxxx"
                                className="font-mono"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address1" className="text-sm font-medium text-gray-700">
                            {activeTab === "company" ? "Company Address 1" : "Address 1"}
                        </Label>
                        <Input
                            id="address1"
                            value={formData.address1}
                            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                            placeholder="Substreet, Street, Barangay"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address2" className="text-sm font-medium text-gray-700">
                            {activeTab === "company" ? "Company Address 2" : "Address 2"}
                        </Label>
                        <Input
                            id="address2"
                            value={formData.address2}
                            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                            placeholder="City / Municipality, Province ZIP Code"
                        />
                    </div>

                    <div className="text-sm text-gray-500">* At least one address field must be filled</div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="domestic"
                                name="entity"
                                checked={!formData.isForeign}
                                onChange={() => setFormData({ ...formData, isForeign: false })}
                                className="text-[#0097B2] focus:ring-[#0097B2]"
                            />
                            <Label htmlFor="domestic" className="text-sm font-medium text-gray-700">
                                Domestic
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="foreign"
                                name="entity"
                                checked={formData.isForeign}
                                onChange={() => setFormData({ ...formData, isForeign: true })}
                                className="text-[#0097B2] focus:ring-[#0097B2]"
                            />
                            <Label htmlFor="foreign" className="text-sm font-medium text-gray-700">
                                Foreign
                            </Label>
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                        <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-[#0097B2] hover:bg-[#007A94] w-full sm:w-auto">
                            {isLoading ? "Adding..." : `Add ${activeTab === "company" ? "Company" : "Individual"}`}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}