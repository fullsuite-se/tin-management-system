"use client"

import { useState } from "react"
import AddClientDialog from "./components/AddClientDialog"
import EditClientDialog from "./components/EditClientDialog"
// import DeleteClientDialog from "./components/DeleteClientDialog"
// import ViewClientDialog from "./components/ViewClientDialog"
import type { TINEntry } from "./lib/types"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

export default function App() {
    // Dialog states
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    // const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    // const [showViewDialog, setShowViewDialog] = useState(false)

    // Data state
    const [entries, setEntries] = useState<TINEntry[]>([])
    const [selectedEntry, setSelectedEntry] = useState<TINEntry | null>(null)

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

    // const handleDelete = () => {
    //     if (selectedEntry) {
    //         setEntries(entries.filter((entry) => entry.id !== selectedEntry.id))
    //         console.log("Deleted entry:", selectedEntry)
    //     }
    //     setShowDeleteDialog(false)
    //     setSelectedEntry(null)
    // }

    const openEditDialog = () => {
        setSelectedEntry(sampleEntry)
        setShowEditDialog(true)
    }

    // const openDeleteDialog = () => {
    //     setSelectedEntry(sampleEntry)
    //     setShowDeleteDialog(true)
    // }
    //
    // const openViewDialog = () => {
    //     setSelectedEntry(sampleEntry)
    //     setShowViewDialog(true)
    // }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">TIN Database Dialog Testing</h1>
                    <p className="text-gray-600">Test all dialog components individually</p>
                </div>

                {/* Dialog Test Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Add Client Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
                            <Plus className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Add Client</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Test the add client dialog with company and individual tabs, form validation, and submission.
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
                            Test the edit client dialog with pre-populated form data and update functionality.
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
                            Test the delete confirmation dialog with client preview and warning message.
                        </p>
                        {/*<button*/}
                        {/*    onClick={openDeleteDialog}*/}
                        {/*    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"*/}
                        {/*>*/}
                        {/*    Open Delete Dialog*/}
                        {/*</button>*/}
                    </div>

                    {/* View Client Card */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
                            <Eye className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">View Client</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Test the view client dialog showing detailed client information and metadata.
                        </p>
                        {/*<button*/}
                        {/*    onClick={openViewDialog}*/}
                        {/*    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"*/}
                        {/*>*/}
                        {/*    Open View Dialog*/}
                        {/*</button>*/}
                    </div>
                </div>

                {/* Added Entries Display */}
                {entries.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Added Entries ({entries.length})</h2>
                        <div className="space-y-3">
                            {entries.map((entry) => (
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
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedEntry(entry)
                                                    // setShowViewDialog(true)
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
                                                    // setShowDeleteDialog(true)
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
                    </div>
                )}

                {/* Sample Data Info */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">Testing Information</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>
                            • <strong>Add Dialog:</strong> Creates new entries and adds them to the list below
                        </li>
                        <li>
                            • <strong>Edit Dialog:</strong> Uses sample data for testing, updates will show in console
                        </li>
                        <li>
                            • <strong>Delete Dialog:</strong> Uses sample data for testing, deletion will show in console
                        </li>
                        <li>
                            • <strong>View Dialog:</strong> Uses sample data to show detailed client information
                        </li>
                        <li>
                            • <strong>Real Entries:</strong> Added entries can be viewed, edited, and deleted using the action buttons
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

            {/*<DeleteClientDialog*/}
            {/*    isOpen={showDeleteDialog}*/}
            {/*    onClose={() => {*/}
            {/*        setShowDeleteDialog(false)*/}
            {/*        setSelectedEntry(null)*/}
            {/*    }}*/}
            {/*    onConfirm={handleDelete}*/}
            {/*    entry={selectedEntry}*/}
            {/*/>*/}

            {/*<ViewClientDialog*/}
            {/*    isOpen={showViewDialog}*/}
            {/*    onClose={() => {*/}
            {/*        setShowViewDialog(false)*/}
            {/*        setSelectedEntry(null)*/}
            {/*    }}*/}
            {/*    entry={selectedEntry}*/}
            {/*/>*/}
        </div>
    )
}
