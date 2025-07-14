"use client"

import { useState, useEffect } from "react"
import type { TINEntry } from "../lib/types.tsx"
import type { ModalState } from "../lib/types.tsx"

export function useDashboard(email: string) {
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
            } catch (err) {
                console.error("Fetch failed:", err);
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

    const handleAdd = (newEntry: Omit<TINEntry, "id" | "createdAt" | "createdBy">) => {
        const entry: TINEntry = {
            ...newEntry,
            id: (entries.length + 1).toString(),
            createdAt: new Date(),
            createdBy: email,
        }
        setEntries([entry, ...entries])
    }

    const handleUpdate = (updatedEntry: TINEntry) => {
        setEntries(
            entries.map((entry) =>
                entry.id === updatedEntry.id
                    ? {
                        ...updatedEntry,
                        editedBy: email,
                        editedAt: new Date(),
                    }
                    : entry,
            ),
        )
    }

    const handleDelete = (entry: TINEntry) => {
        setEntries(entries.filter((e) => e.id !== entry.id))
    }

    const handleEdit = (entry: TINEntry) => {
        setModal({ type: "edit", entry })
    }

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
        handleEdit,
        handleFormClose,
    }
}
