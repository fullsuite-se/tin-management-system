import React from 'react'
import { Button } from '../../ui/Button.tsx'
import { Plus, X } from "lucide-react"
import SearchAndFilter from "./SearchAndFilter.tsx";
import type { ModalState } from '../../../lib/types.tsx';

interface Props {
    searchTerm: string,
    totalEntries: number,
    filteredEntries: number,
    hasActiveFilters: boolean,
    filters: {
        entityType: string;
        classification: string;
        dateRange: string;
    }
    setModal: (modal: ModalState) => void;
    setSearchTerm: (value: string) => void;
    // setShowFilters: (value: boolean) => void;
    clearFilters: () => void;
}

const TableHeader: React.FC<Props> = ({ searchTerm, totalEntries, filteredEntries, hasActiveFilters, filters, setModal, setSearchTerm, clearFilters }) => {
    return (
        <div className="bg-gradient-to-r from-[#0097B2] to-[#00B4D8] p-3 text-white md:rounded-t-xl flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h2 className="text-base font-bold">Client Directory</h2>
                    <p className="hidden md:flex text-blue-100 text-xs mt-1">Total: {totalEntries} entries • Showing: {filteredEntries} results • Click any row to view details</p>
                    <p className="md:hidden text-blue-100 text-xs mt-1">Showing {filteredEntries} of {totalEntries} entries</p>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            setModal({ type: "add" , entry: null});
                        }}
                        size="sm"
                        className="bg-white text-[#0097B2] hover:bg-gray"
                    >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Client
                </Button>
                </div>
            </div>

            <SearchAndFilter
                searchTerm={searchTerm}
                filters={filters}
                hasActiveFilters={hasActiveFilters}
                setSearchTerm={setSearchTerm}
                setModal={setModal}
            />


            {hasActiveFilters && (
                <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-blue-200">Active Filters:</span>
                    {filters.entityType !== "all" && (
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">
                            {filters.entityType === "individual" ? "Individual" : "Company"}
                        </span>
                    )}
                    {filters.classification !== "all" && (
                        <span className="bg-hite/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">
                            {filters.classification === "foreign" ? "Foreign" : "Domestic"}
                        </span>
                    )}
                    {filters.dateRange !== "all" && (
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">
                            Last {filters.dateRange}
                        </span>
                    )}
                    <Button
                        onClick={clearFilters}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 h-5 px-1 backdrop-blur-sm"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            )}
        </div>
    );
}

export default TableHeader;