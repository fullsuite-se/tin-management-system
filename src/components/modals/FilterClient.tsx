"use client"

import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal" // your custom modal
import { Button } from "../ui/Button"
import { Label } from "../ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../ui/select"

interface FilterState {
    entityType: string
    classification: string
    dateRange: string
}

interface FilterClientProps {
    isOpen: boolean
    onClose: () => void
    filters: FilterState
    onFiltersChange: (filters: FilterState) => void
    onClearFilters: () => void
}

export default function FilterClient({
                                         isOpen,
                                         onClose,
                                         filters,
                                         onFiltersChange,
                                         onClearFilters,
                                     }: FilterClientProps) {
    const handleFilterChange = (key: keyof FilterState, value: string) => {
        onFiltersChange({
            ...filters,
            [key]: value,
        })
    }

    const handleApplyFilters = () => {
        onClose()
    }

    const handleClearAll = () => {
        onClearFilters()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
            <ModalHeader>
                Filter Clients
                <button
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                    aria-label="Close"
                >
                    ✕
                </button>
            </ModalHeader>

            <ModalBody>
                <div className="space-y-6">
                    {/* Entity Type */}
                    <div>
                        <Label>Entity Type</Label>
                        <Select
                            value={filters.entityType}
                            onChange={(value) => handleFilterChange("entityType", value)}
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {filters.entityType === "all"
                                        ? "All Types"
                                        : filters.entityType.charAt(0).toUpperCase() +
                                        filters.entityType.slice(1)}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    isSelected={filters.entityType === "all"}
                                    onSelect={() => handleFilterChange("entityType", "all")}
                                >
                                    All Types
                                </SelectItem>
                                <SelectItem
                                    isSelected={filters.entityType === "company"}
                                    onSelect={() => handleFilterChange("entityType", "company")}
                                >
                                    Company
                                </SelectItem>
                                <SelectItem
                                    isSelected={filters.entityType === "individual"}
                                    onSelect={() =>
                                        handleFilterChange("entityType", "individual")
                                    }
                                >
                                    Individual
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Classification */}
                    <div>
                        <Label>Classification</Label>
                        <Select
                            value={filters.classification}
                            onChange={(value) => handleFilterChange("classification", value)}
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {filters.classification === "all"
                                        ? "All Classifications"
                                        : filters.classification.charAt(0).toUpperCase() +
                                        filters.classification.slice(1)}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    isSelected={filters.classification === "all"}
                                    onSelect={() => handleFilterChange("classification", "all")}
                                >
                                    All Classifications
                                </SelectItem>
                                <SelectItem
                                    isSelected={filters.classification === "domestic"}
                                    onSelect={() => handleFilterChange("classification", "domestic")}
                                >
                                    Domestic
                                </SelectItem>
                                <SelectItem
                                    isSelected={filters.classification === "foreign"}
                                    onSelect={() => handleFilterChange("classification", "foreign")}
                                >
                                    Foreign
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Range */}
                    <div>
                        <Label>Date Added</Label>
                        <Select
                            value={filters.dateRange}
                            onChange={(value) => handleFilterChange("dateRange", value)}
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {filters.dateRange === "all"
                                        ? "All Time"
                                        : filters.dateRange === "week"
                                            ? "Last Week"
                                            : filters.dateRange === "month"
                                                ? "Last Month"
                                                : filters.dateRange === "year"
                                                    ? "Last Year"
                                                    : ""}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    isSelected={filters.dateRange === "all"}
                                    onSelect={() => handleFilterChange("dateRange", "all")}
                                >
                                    All Time
                                </SelectItem>
                                <SelectItem
                                    isSelected={filters.dateRange === "week"}
                                    onSelect={() => handleFilterChange("dateRange", "week")}
                                >
                                    Last Week
                                </SelectItem>
                                <SelectItem
                                    isSelected={filters.dateRange === "month"}
                                    onSelect={() => handleFilterChange("dateRange", "month")}
                                >
                                    Last Month
                                </SelectItem>
                                <SelectItem
                                    isSelected={filters.dateRange === "year"}
                                    onSelect={() => handleFilterChange("dateRange", "year")}
                                >
                                    Last Year
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="flex-1 bg-transparent hover:bg-gray-50"
                >
                    Clear All
                </Button>
                <Button
                    onClick={handleApplyFilters}
                    className="flex-1"
                    variant="default"
                >
                    Apply Filters
                </Button>
            </ModalFooter>
        </Modal>
    )
}
