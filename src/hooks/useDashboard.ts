"use client"

import { useState, useEffect } from "react"
import type { TINEntry } from "../lib/types.tsx"
import type { ModalState } from "../lib/types.tsx"

export function useDashboard(name: string) {
    // Entry States
    const [entries, setEntries] = useState<TINEntry[]>([])
    const [currentEntries, setCurrentEntries] = useState<TINEntry[]>([])
    const [filteredEntries, setFilteredEntries] = useState<TINEntry[]>([])

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const [modal, setModal] = useState<ModalState>({
        type: null,
        entry: null,
    })

    const [addingEntry, setAddingEntry] = useState<TINEntry | null>(null)
    const [editingEntry, setEditingEntry] = useState<TINEntry | null>(null)
    const [deletingEntry, setDeletingEntry] = useState<TINEntry | null>(null)
    const [viewingEntry, setViewingEntry] = useState<TINEntry | null>(null)

    const [showFilters, setShowFilters] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        entityType: "all",
        classification: "all",
        dateRange: "all",
    })

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://tin-management-system.vercel.app/api/actions/retrieveEntry");
                const json = await res.json();

                if (!res.ok) {
                    console.error("Error fetching data:", json.message);
                    return;
                }

                const data: TINEntry[] = json.data;
                setEntries(data);
            } catch (e) {
                console.error("Fetch failed:", e);
            }
        };

        fetchData();
    }, []);

    // Functions
    const clearFilters = () => {
        setFilters({
            entityType: "all",
            classification: "all",
            dateRange: "all",
        })
    }

    const hasActiveFilters =
        filters.entityType !== "all" || filters.classification !== "all" || filters.dateRange !== "all"

    // Filter entries based on search term and filters
    useEffect(() => {
        let filtered = entries.filter(
            (entry) =>
                entry.tin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.registeredName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.address1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.address2.toLowerCase().includes(searchTerm.toLowerCase()),
        )

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
        setCurrentPage(1)
    }, [entries, searchTerm, filters])

    const handleAdd = async (newEntry: Omit<TINEntry, "id" | "createdAt" | "createdBy">) => {
        const entry: TINEntry = {
            ...newEntry,
            createdAt: new Date(),
            createdBy: name,
        };

        try {
            const res = await fetch("https://tin-management-system.vercel.app/api/actions/addEntry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entry),
            });

            if (!res.ok) {
                console.error("Add failed:", res.status, res.statusText);
                alert("Failed to Add Entry")
                return;
            }

            const data = await res.json();
            entry.id = data.id;

            alert("Entry Added Successfully")

            setEntries([entry, ...entries]);
        } catch (e) {
            console.error("Add failed: ", e);
            return;
        }
    };

    const handleUpdate = async (updatedEntry: TINEntry) => {
        const id = updatedEntry.id;

        try {
            const res = await fetch("https://tin-management-system.vercel.app/api/actions/editEntry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    data: {
                        ...updatedEntry,
                        editedBy: name,
                        editedAt: new Date(),
                    }
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                console.error("Update failed:", json.message, json.error);
                alert("Failed to Update Entry");
                return;
            }

            alert("Entry Updated Successfully")

            // Optionally update local state
            setEntries((prev) =>
                prev.map((entry) =>
                    entry.id === updatedEntry.id
                        ? {
                            ...updatedEntry,
                            editedBy: name,
                            editedAt: new Date(),
                        }
                        : entry
                )
            );
        } catch (e) {
            console.error("Update failed: ", e);
            return;
        }
    }

    const handleDelete = async (id: string | null) => {
        if (!id) {
            console.error("ID is null, cannot delete entry");
            return;
        }

        try {
            const res = await fetch(`https://tin-management-system.vercel.app/api/actions/removeEntry?id=${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                console.error("Delete failed:", res.status, res.statusText);
                alert("Failed to Remove Entry")
                return;
            }

            alert("Entry Removed Successfully")

            setEntries(entries.filter((e) => e.id !== id));
        } catch (e) {
            console.error("Delete failed:", e);
            return;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://tin-management-system.vercel.app/api/actions/retrieveEntry");
                const json = await res.json();

                if (!res.ok) {
                    console.error("Error fetching data:", json.message);
                    return;
                }

                const data: TINEntry[] = json.data;
                setEntries(data);
            } catch (err) {
                console.error("Fetch failed:", err);
            }
        };

        fetchData();
    }, []);

    const handleFormClose = () => {
        setModal({ type: null, entry: null })
    }

    return {
        entries,
        currentEntries,
        filteredEntries,
        currentPage,
        itemsPerPage,
        modal,
        addingEntry,
        editingEntry,
        deletingEntry,
        viewingEntry,
        showFilters,
        searchTerm,
        filters,
        setEntries,
        setCurrentEntries,
        setFilteredEntries,
        setCurrentPage,
        setItemsPerPage,
        setModal,
        setAddingEntry,
        setEditingEntry,
        setDeletingEntry,
        setViewingEntry,
        setShowFilters,
        setSearchTerm,
        setFilters,
        clearFilters,
        hasActiveFilters,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleFormClose,
    }
}
