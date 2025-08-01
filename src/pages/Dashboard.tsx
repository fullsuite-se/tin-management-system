import type React from "react"
import Header from "../components/dashboard/Header.tsx"
import Layout from "../components/layout/Layout.tsx"
import TableHeader from "../components/dashboard/table/TableHeader.tsx"
import Table from "../components/dashboard/table/Table.tsx"
import { useDashboard } from "../hooks/use-dashboard.ts"
import Pagination from "../components/dashboard/table/Pagination.tsx"
import ViewClient from "../components/modals/ViewClient.tsx"
import AddClient from "../components/modals/AddClient.tsx"
import EditClient from "../components/modals/EditClient.tsx"
import DeleteClient from "../components/modals/DeleteClient.tsx"
import ExportData from "../components/modals/ExportData.tsx"
import FilterClient from "../components/modals/FilterClient.tsx"

interface DashboardProps {
    name: string
    email: string
    avatar: string
    onLogout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ name, email, avatar, onLogout }) => {
    const {
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
    } = useDashboard(name)

    return (
        <Layout>
            <Header name={name} email={email} avatar={avatar} onLogout={onLogout} />
            <div className="flex flex-col flex-1 overflow-hidden md:mt-4 bg-white/80 backdrop-blur-sm md:rounded-xl shadow-lg border border-white/50">
                <TableHeader
                    searchTerm={searchTerm}
                    totalEntries={entries.length}
                    filteredEntries={filteredEntries.length}
                    hasActiveFilters={hasActiveFilters}
                    filters={filters}
                    setModal={setModal}
                    setSearchTerm={setSearchTerm}
                    clearFilters={clearFilters}
                />
                <div className="flex-1 overflow-y-auto">
                    <Table entries={currentEntries} setModal={setModal} />
                </div>
                <Pagination
                    filteredEntries={filteredEntries}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    setCurrentEntries={setCurrentEntries}
                    setItemsPerPage={setItemsPerPage}
                />
            </div>

            <ViewClient isOpen={modal.type === "view"} onClose={handleFormClose} entry={modal.entry} />
            <AddClient isOpen={modal.type === "add"} onClose={handleFormClose} onAdd={handleAdd} />
            <EditClient
                isOpen={modal.type === "edit"}
                onClose={handleFormClose}
                onSubmit={handleUpdate}
                entry={modal.entry}
            />
            <DeleteClient
                isOpen={modal.type === "delete"}
                onClose={handleFormClose}
                onSubmit={handleDelete}
                entry={modal.entry}
            />
            <FilterClient
                isOpen={modal.type === "filter"}
                onClose={handleFormClose}
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
            />
            <ExportData isOpen={modal.type === "export"}
                        onClose={handleFormClose}
                        onExport={handleExport}
            />
        </Layout>
    )
}

export default Dashboard
