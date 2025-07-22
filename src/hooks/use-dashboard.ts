import { useState, useEffect } from "react"
import type { TINEntry, ModalState } from "../types/types.tsx"
import useAlert from "./use-alert.ts"
import useToast from "./use-toast.ts"

export function useDashboard(name: string) {
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const { showAlert } = useAlert();
    const { showToast } = useToast();

    // Entry States
    const [entries, setEntries] = useState<TINEntry[]>([])
    const [currentEntries, setCurrentEntries] = useState<TINEntry[]>([])
    const [filteredEntries, setFilteredEntries] = useState<TINEntry[]>([])

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Modal States
    const [modal, setModal] = useState<ModalState>({
        type: null,
        entry: null,
    })

    // Search and Filter States
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        entityType: "all",
        classification: "all",
        dateRange: "all",
    })

    // Closes an active modal
    const handleFormClose = () => {
        setModal({ type: null, entry: null })
    }

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE}/entries/retrieve`);
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

    // Clears filters
    const clearFilters = () => {
        setFilters({
            entityType: "all",
            classification: "all",
            dateRange: "all",
        })
    }

    // Checks active filters
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

    // Add entries to the DB
    const handleAdd = async (newEntry: Omit<TINEntry, "id" | "createdAt" | "createdBy">) => {
        const entry: TINEntry = {
            ...newEntry,
            createdAt: new Date(),
            createdBy: name,
        };

        try {
            const res = await fetch(`${API_BASE}/entries/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entry),
            });

            const json = await res.json();

            if (!res.ok) {
                showAlert({
                    statusCode: res.status,
                    title: json.title,
                    message: json.message,
                })
                return;
            } else {
                entry.id = json.id;
                showToast({
                    title: json.title,
                    message: json.message,
                })
                setEntries([entry, ...entries]);
            }
        } catch (e) {
            console.error("Add failed: ", e);
            return;
        }
    };

    // Update an entry in the DB
    const handleUpdate = async (updatedEntry: TINEntry) => {
        const id = updatedEntry.id;

        try {
            const res = await fetch(`${API_BASE}/entries/edit?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...updatedEntry,
                    editedBy: name,
                    editedAt: new Date(),
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                showAlert({
                    statusCode: res.status,
                    title: json.title,
                    message: json.message,
                })
                return;
            } else {
                showToast({
                    title: json.title,
                    message: json.message,
                })

                // update local state
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
            }
        } catch (e) {
            console.error("Update failed: ", e);
            return;
        }
    }

    // Deletes an entry in the DB
    const handleDelete = async (id: string | null) => {
        if (!id) {
            console.error("ID is null, cannot delete entry");
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/entries/delete?id=${id}`, {
                method: "DELETE",
            });

            const json = await res.json();

            if (!res.ok) {
                showAlert({
                    statusCode: res.status,
                    title: json.title,
                    message: json.message,
                })
            } else {
                showToast({
                    title: json.title,
                    message: json.message,
                })

                setEntries(entries.filter((e) => e.id !== id));
            }
        } catch (e) {
            console.error("Delete failed:", e);
            return;
        }
    }

    const handleExport = async (link: string) => {
        if (!link) {
            console.error("Link is null, cannot export entries");
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/exportToSheets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sheetUrl: link
                })
            })

            const json = await res.json();

            if (!res.ok) {
                showAlert({
                    statusCode: res.status,
                    title: json.title,
                    message: json.message,
                })
                return;
            } else {
                showToast({
                    title: json.title,
                    message: json.message,
                })
            }
        } catch (e) {
            console.error("Export failed:", e);
            return;
        }
    }

    return {
        entries,
        currentEntries,
        filteredEntries,
        currentPage,
        itemsPerPage,
        modal,
        searchTerm,
        filters,

        setCurrentEntries,
        setCurrentPage,
        setItemsPerPage,
        setFilters,
        setModal,
        setSearchTerm,
        clearFilters,
        hasActiveFilters,

        handleAdd,
        handleUpdate,
        handleDelete,
        handleExport,
        handleFormClose,
    }
}
