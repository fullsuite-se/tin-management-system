import React from 'react'
import { useState, useEffect } from 'react'
import Header from './header/Header.tsx'
import type { TINEntry } from "../../utils/types.tsx";
import { generateMockData } from "../../utils/utils.ts";
import TableHeader from "./table/TableHeader.tsx";
import Table from "./table/Table.tsx";

interface Props {
    name: string,
    email: string,
    avatar: string,
    onLogout: () => void
}

interface FilterState {
    entityType: string // "all" | "individual" | "company"
    classification: string // "all" | "domestic" | "foreign"
    dateRange: string // "all" | "week" | "month" | "year"
}

const Dashboard: React.FC<Props> = ({ name, email, avatar, onLogout }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [entries, setEntries] = useState<TINEntry[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredEntries, setFilteredEntries] = useState<TINEntry[]>([])
    const [filters, setFilters] = useState<FilterState>({
        entityType: "all",
        classification: "all",
        dateRange: "all",
    });

    // Initialize with mock data
    useEffect(() => {
        const mockData = generateMockData()
        setEntries(mockData)
    }, [])

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



    if (isFormOpen && showFilters && currentPage && filteredEntries) {
        console.log("open");
    }

    return (
        <div className="min-h-screen md:bg-gradient-to-br md:from-slate-50 md:via-blue-50/30 md:to-slate-100">
            <div className="max-w-7xl mx-auto md:p-3 space-y-3">
                <Header name={name} email={email} avatar={avatar} onLogout={onLogout} />

                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 flex flex-col h-[calc(100vh-120px)]">
                    <TableHeader
                        searchTerm={searchTerm}
                        totalEntries={entries.length}
                        filteredEntries={filteredEntries.length}
                        hasActiveFilters={hasActiveFilters}
                        filters={filters}
                        setIsFormOpen={setIsFormOpen}
                        setSearchTerm={setSearchTerm}
                        setShowFilters={setShowFilters}
                        clearFilters={clearFilters}
                    />

                    <Table entries={entries} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
