import React from 'react';
import {useState, useEffect} from 'react';
import {Input} from '../../ui/Input.tsx';
import {Button} from '../../ui/Button.tsx';
import type {TINEntry} from '../../../types/types.tsx';

interface Props {
    filteredEntries: TINEntry[],
    currentPage: number,
    itemsPerPage: number,
    setCurrentPage: (value: number) => void,
    setCurrentEntries: (value: TINEntry[]) => void,
    setItemsPerPage: (value: number) => void,
}

const Pagination: React.FC<Props> = ({ filteredEntries, currentPage, itemsPerPage, setCurrentPage, setCurrentEntries, setItemsPerPage }) => {
    const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
    const [inputValue, setInputValue] = useState(itemsPerPage.toString());

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedEntries = filteredEntries.slice(startIndex, endIndex);
        setCurrentEntries(slicedEntries);
    }, [currentPage, itemsPerPage, filteredEntries, setCurrentEntries]);

    // Sliding window logic
    const maxVisiblePages = 5;
    const half = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - half);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const handleUpdateItemsPerPage = () => {
        const parsed = parseInt(inputValue, 10);
        if (!isNaN(parsed) && parsed > 0) {
            setItemsPerPage(parsed);
            setCurrentPage(1);
        } else {
            setInputValue(itemsPerPage.toString()); // Revert if invalid
        }
    };

    return (
        <div className="px-3 py-2 bg-gradient-to-r from-slate-50/80 to-blue-50/50 border-t border-gray-200 flex flex-col space-y-3 sm:flex-row items-center sm:justify-between sm:space-y-0 rounded-b-xl backdrop-blur-sm">
            <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">
                    Show
                </span>
                <Input
                    className="w-10 h-6 p-0 text-center"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={inputValue}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) { // Allow only digits
                            setInputValue(val);
                        }
                    }}
                    onBlur={handleUpdateItemsPerPage}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleUpdateItemsPerPage();
                    }}
                />
                <span className="text-xs text-gray-600">
                    per page
                </span>
            </div>

            <div className="flex items-center space-x-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-6 px-2 text-xs bg-white/80 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                >
                    Previous
                </Button>

                {visiblePages.map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`h-6 w-6 p-0 text-xs transition-all duration-200 backdrop-blur-sm ${
                            currentPage === page
                                ? "bg-gradient-to-r from-[#0097B2] to-[#00B4D8] hover:from-[#007A94] hover:to-[#0097B2] text-white shadow-lg"
                                : "bg-white/80 shadow-sm hover:shadow-md"
                        }`}
                    >
                        {page}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-6 px-2 text-xs bg-white/80 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                >
                    Next
                </Button>
            </div>

            <div className="hidden md:block text-xs text-gray-600">
                Page {currentPage} of {totalPages} • {filteredEntries.length} records
            </div>
            <div className="block md:hidden text-xs text-gray-600">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
}

export default Pagination;