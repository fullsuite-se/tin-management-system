"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { TINEntry } from "../lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/Button.tsx"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { validateTIN, validateAddress } from "../lib/utils.ts"

interface EditClientDialogProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (entry: TINEntry) => void
    entry: TINEntry | null
}

export default function EditClientDialog({ isOpen, onClose, onSubmit, entry }: EditClientDialogProps) {
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
            setError("Failed to update entry")
        } finally {
            setIsLoading(false)
        }
    }

    if (!entry) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-semibold">
                        Edit {entry.isIndividual ? "Individual" : "Company"} Details
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="text-sm text-gray-600">
                        {entry.isIndividual
                            ? "Update the individual client details in the database."
                            : "Update the company details in the database."}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                {entry.isIndividual ? "Individual Name" : "Company Name"} *
                            </Label>
                            <Input
                                id="name"
                                value={formData.registeredName}
                                onChange={(e) => setFormData({ ...formData, registeredName: e.target.value })}
                                placeholder={entry.isIndividual ? "Enter first name, middle name, last name" : "Enter the Company Name"}
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
                            {entry.isIndividual ? "Address 1" : "Company Address 1"}
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
                            {entry.isIndividual ? "Address 2" : "Company Address 2"}
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
                        <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto bg-transparent">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-[#0097B2] hover:bg-[#007A94] w-full sm:w-auto">
                            {isLoading ? "Updating..." : `Update ${entry.isIndividual ? "Individual" : "Company"}`}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
