"use client"

import { useState, useEffect } from "react"
import AddClientDialog from "./components/AddClientDialog"
import EditClientDialog from "./components/EditClientDialog"
import DeleteClientDialog from "./components/DeleteClientDialog"
import ViewClientDialog from "./components/ViewClientDialog"
import FilterDialog from "./components/FilterDialog"
import type { TINEntry } from "./lib/types"
import { Plus, Edit, Trash2, Eye, Filter, X } from "lucide-react"

interface FilterState {
    entityType: string
    classification: string
    dateRange: string
}

export default function App() {
    // Dialog states
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showViewDialog, setShowViewDialog] = useState(false)

    // Data state
    const [entries, setEntries] = useState<TINEntry[]>([])
    const [filteredEntries, setFilteredEntries] = useState<TINEntry[]>([])
    const [selectedEntry, setSelectedEntry] = useState<TINEntry | null>(null)

    // Filter state
    const [showFilterDialog, setShowFilterDialog] = useState(false)
    const [filters, setFilters] = useState<FilterState>({
        entityType: "all",
        classification: "all",
        dateRange: "all",
    })

    // Sample entry for testing edit, delete, and view
    const sampleEntry: TINEntry = {
        id: "sample-1",
        tin: "123-456-789-0000",
        registeredName: "Sample Company Inc.",
        address1: "123 Business Street, Business District",
        address2: "Manila City, Metro Manila, 1000",
        isIndividual: false,
        isForeign: false,
        createdBy: "admin@getfullsuite.com",
        createdAt: new Date("2024-01-15"),
        editedBy: "admin@getfullsuite.com",
        editedAt: new Date("2024-01-20"),
    }

    // Sample entries for testing
    const sampleEntries: TINEntry[] = [
        sampleEntry,
        {
            id: "sample-2",
            tin: "987-654-321-0000",
            registeredName: "Maria Santos",
            address1: "456 Residential Ave",
            address2: "Quezon City, Metro Manila, 1100",
            isIndividual: true,
            isForeign: false,
            createdBy: "hr@getfullsuite.com",
            createdAt: new Date("2024-01-10"),
        },
        {
            id: "sample-3",
            tin: "555-777-888-0000",
            registeredName: "Global Tech Solutions Ltd.",
            address1: "789 International Plaza",
            address2: "Makati City, Metro Manila, 1200",
            isIndividual: false,
            isForeign: true,
            createdBy: "admin@getfullsuite.com",
            createdAt: new Date("2024-01-05"),
        },
        {
            id: "sample-4",
            tin: "111-222-333-0000",
            registeredName: "John Smith",
            address1: "321 Foreign Street",
            address2: "Taguig City, Metro Manila, 1630",
            isIndividual: true,
            isForeign: true,
            createdBy: "hr@getfullsuite.com",
            createdAt: new Date("2023-12-20"),
        },
    ]

    // Initialize with sample data
    useEffect(() => {
        setEntries(sampleEntries)
    }, [])

    // Filter entries based on filter criteria
    useEffect(() => {
        let filtered = entries

        // Apply entity type filter
        if (filters.entityType !== "all") {
            filtered = filtered.filter((entry) =>
                filters.entityType === "individual" ? entry.isIndividual : !entry.isIndividual,
            )
        }

        // Apply classification filter
        if (filters.classification !== "all") {
            filtered = filtered.filter((entry) => (filters.classification === "foreign" ? entry.isForeign : !entry.isForeign))
        }

        // Apply date range filter
        if (filters.dateRange !== "all") {
            const now = new Date()
            const filterDate = new Date()

            switch (filters.dateRange) {
                case "week":
                    filterDate.setDate(now.getDate() - 7)
                    break
                case "month":
                    filterDate.setMonth(now.getMonth() - 1)
                    break
                case "year":
                    filterDate.setFullYear(now.getFullYear() - 1)
                    break
            }

            filtered = filtered.filter((entry) => new Date(entry.createdAt) >= filterDate)
        }

        setFilteredEntries(filtered)
    }, [entries, filters])

    const hasActiveFilters =
        filters.entityType !== "all" || filters.classification !== "all" || filters.dateRange !== "all"

    const clearFilters = () => {
        setFilters({
            entityType: "all",
            classification: "all",
            dateRange: "all",
        })
    }

    // Handlers
    const handleAdd = (newEntry: Omit<TINEntry, "id" | "createdAt" | "createdBy">) => {
        const entry: TINEntry = {
            ...newEntry,
            id: (entries.length + 1).toString(),
            createdAt: new Date(),
            createdBy: "test@getfullsuite.com",
        }
        setEntries([entry, ...entries])
        console.log("Added entry:", entry)
        setShowAddDialog(false)
    }

    const handleEdit = (updatedEntry: TINEntry) => {
        setEntries(
            entries.map((entry) =>
                entry.id === updatedEntry.id
                    ? { ...updatedEntry, editedBy: "test@getfullsuite.com", editedAt: new Date() }
                    : entry,
            ),
        )
        console.log("Updated entry:", updatedEntry)
        setShowEditDialog(false)
        setSelectedEntry(null)
    }

    const handleDelete = () => {
        if (selectedEntry) {
            setEntries(entries.filter((entry) => entry.id !== selectedEntry.id))
            console.log("Deleted entry:", selectedEntry)
        }
        setShowDeleteDialog(false)
        setSelectedEntry(null)
    }

    const openEditDialog = () => {
        setSelectedEntry(sampleEntry)
        setShowEditDialog(true)
    }

    const openDeleteDialog = () => {
        setSelectedEntry(sampleEntry)
        setShowDeleteDialog(true)
    }

    const openViewDialog = () => {
        setSelectedEntry(sampleEntry)
        setShowViewDialog(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">TIN Database Dialog Testing</h1>
                    <p className="text-gray-600">Test all dialog components and filter functionality</p>
                </div>

                {/* Dialog Test Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    {/* Add Client Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
                            <Plus className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Add Client</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Test the add client dialog with company and individual tabs.
                        </p>
                        <button
                            onClick={() => setShowAddDialog(true)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Open Add Dialog
                        </button>
                    </div>

                    {/* Edit Client Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                            <Edit className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Edit Client</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Test the edit client dialog with pre-populated form data.
                        </p>
                        <button
                            onClick={openEditDialog}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Open Edit Dialog
                        </button>
                    </div>

                    {/* Delete Client Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4 mx-auto">
                            <Trash2 className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Delete Client</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Test the delete confirmation dialog with client preview.
                        </p>
                        <button
                            onClick={openDeleteDialog}
                            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Open Delete Dialog
                        </button>
                    </div>

                    {/* View Client Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
                            <Eye className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">View Client</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Test the view client dialog with detailed information.
                        </p>
                        <button
                            onClick={openViewDialog}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Open View Dialog
                        </button>
                    </div>

                    {/* Filter Testing Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4 mx-auto">
                            <Filter className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Filter Testing</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">Test filter functionality with sample data.</p>
                        <button
                            onClick={() => setShowFilterDialog(true)}
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Open Filter Dialog
                        </button>
                    </div>
                </div>

                {/* Filter Status Bar */}
                {hasActiveFilters && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Filter className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-800">Active Filters:</span>
                                <div className="flex space-x-2">
                                    {filters.entityType !== "all" && (
                                        <span className="bg-yellow-200 px-2 py-1 rounded text-xs font-medium text-yellow-800">
                      {filters.entityType === "individual" ? "Individual" : "Company"}
                    </span>
                                    )}
                                    {filters.classification !== "all" && (
                                        <span className="bg-yellow-200 px-2 py-1 rounded text-xs font-medium text-yellow-800">
                      {filters.classification === "foreign" ? "Foreign" : "Domestic"}
                    </span>
                                    )}
                                    {filters.dateRange !== "all" && (
                                        <span className="bg-yellow-200 px-2 py-1 rounded text-xs font-medium text-yellow-800">
                      Last {filters.dateRange}
                    </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={clearFilters}
                                className="flex items-center space-x-1 text-yellow-700 hover:text-yellow-900 text-sm"
                            >
                                <X className="h-4 w-4" />
                                <span>Clear Filters</span>
                            </button>
                        </div>
                        <div className="mt-2 text-sm text-yellow-700">
                            Showing {filteredEntries.length} of {entries.length} entries
                        </div>
                    </div>
                )}

                {/* Entries Display */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {hasActiveFilters ? "Filtered" : "All"} Entries ({filteredEntries.length})
                        </h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowFilterDialog(true)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                    hasActiveFilters
                                        ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                <Filter className="h-4 w-4 inline mr-1" />
                                Filter {hasActiveFilters && `(${Object.values(filters).filter((f) => f !== "all").length})`}
                            </button>
                        </div>
                    </div>

                    {filteredEntries.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium mb-2">No entries match your filters</p>
                            <p className="text-sm">Try adjusting your filter criteria or clear all filters</p>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredEntries.map((entry) => (
                                <div key={entry.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{entry.registeredName}</h3>
                                            <p className="text-sm text-gray-600 font-mono">{entry.tin}</p>
                                            <div className="flex space-x-2 mt-2">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                entry.isIndividual ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                            }`}
                        >
                          {entry.isIndividual ? "Individual" : "Company"}
                        </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        entry.isForeign ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                                                    }`}
                                                >
                          {entry.isForeign ? "Foreign" : "Domestic"}
                        </span>
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          Added: {entry.createdAt.toLocaleDateString()}
                        </span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedEntry(entry)
                                                    setShowViewDialog(true)
                                                }}
                                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedEntry(entry)
                                                    setShowEditDialog(true)
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedEntry(entry)
                                                    setShowDeleteDialog(true)
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Testing Information */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">Testing Information</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>
                            • <strong>Add Dialog:</strong> Creates new entries and adds them to the list
                        </li>
                        <li>
                            • <strong>Edit Dialog:</strong> Uses sample data for testing, updates will show in console
                        </li>
                        <li>
                            • <strong>Delete Dialog:</strong> Uses sample data for testing, deletion will show in console
                        </li>
                        <li>
                            • <strong>View Dialog:</strong> Shows detailed client information with filter testing
                        </li>
                        <li>
                            • <strong>Filter Testing:</strong> Test entity type, classification, and date range filters
                        </li>
                        <li>
                            • <strong>Sample Data:</strong> Includes companies, individuals, foreign, and domestic entries
                        </li>
                    </ul>
                </div>
            </div>

            {/* All Dialogs */}
            <AddClientDialog isOpen={showAddDialog} onClose={() => setShowAddDialog(false)} onSubmit={handleAdd} />

            <EditClientDialog
                isOpen={showEditDialog}
                onClose={() => {
                    setShowEditDialog(false)
                    setSelectedEntry(null)
                }}
                onSubmit={handleEdit}
                entry={selectedEntry}
            />

            <DeleteClientDialog
                isOpen={showDeleteDialog}
                onClose={() => {
                    setShowDeleteDialog(false)
                    setSelectedEntry(null)
                }}
                onConfirm={handleDelete}
                entry={selectedEntry}
            />

            <ViewClientDialog
                isOpen={showViewDialog}
                onClose={() => {
                    setShowViewDialog(false)
                    setSelectedEntry(null)
                }}
                entry={selectedEntry}
            />

            <FilterDialog
                isOpen={showFilterDialog}
                onClose={() => setShowFilterDialog(false)}
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
            />
        </div>
    )
}
