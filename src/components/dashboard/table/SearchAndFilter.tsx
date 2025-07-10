import React from 'react'
import { Search, Filter } from "lucide-react"
import { Input } from "../../ui/input.tsx"
import { Button } from "../../ui/Button.tsx"

interface Props {
    filters: object,
    setShowFilters: (value: boolean) => void;
    hasActiveFilters: boolean;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const SearchAndFilter: React.FC<Props> = ({ filters, setShowFilters, hasActiveFilters, searchTerm, setSearchTerm }) => {
    return (
        <div className="flex space-x-2">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                <Input
                    placeholder="Search clients, TIN or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white border-white/50 text-gray-900 placeholder:text-gray-500 focus:border-white focus:ring-white/50 backdrop-blur-sm shadow-sm h-8 text-sm"
                />
            </div>
            <Button
                onClick={() => setShowFilters(true)}
                size="sm"
                variant="outline"
                className={`bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200 h-8 px-3 font-medium shadow-lg ${
                    hasActiveFilters ? "bg-white/20" : ""
                }`}
            >
                <Filter className="h-3 w-3 mr-1" />
                Filter {hasActiveFilters && `(${Object.values(filters).filter((f) => f !== "all").length})`}
            </Button>
        </div>
    );
}

export default SearchAndFilter;