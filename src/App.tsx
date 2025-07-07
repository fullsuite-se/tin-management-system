"use client"

import { useState } from "react"
import AddClientDialog from "./components/AddClientDialog"
import type { TINEntry } from "./lib/types"

export default function App() {
    const [isOpen, setIsOpen] = useState(true)
    const [entries, setEntries] = useState<TINEntry[]>([])

    const handleSubmit = (newEntry: Omit<TINEntry, "id" | "createdAt" | "createdBy">) => {
        // Create a complete entry with generated fields
        const entry: TINEntry = {
            ...newEntry,
            id: (entries.length + 1).toString(),
            createdAt: new Date(),
            createdBy: "test@getfullsuite.com",
        }

        // Add to entries list
        setEntries([entry, ...entries])
        console.log("New entry added:", entry)
        console.log("All entries:", [...entries, entry])

        // Close dialog after submission
        setIsOpen(false)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold mb-4">TIN Database Test</h1>

                {entries.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Added Entries:</h2>
                        <div className="text-left bg-white p-4 rounded-lg shadow max-w-md">
                            {entries.map((entry) => (
                                <div key={entry.id} className="mb-2 p-2 border-b">
                                    <div className="font-medium">{entry.registeredName}</div>
                                    <div className="text-sm text-gray-600">{entry.tin}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-[#0097B2] hover:bg-[#007A94] text-white px-4 py-2 rounded"
                    >
                        Add Another Client
                    </button>
                )}

                <AddClientDialog isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
