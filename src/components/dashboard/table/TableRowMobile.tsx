"use client"

import type React from "react"
import type { TINEntry } from "../../../types/types.tsx"
import { Button } from "../../ui/Button.tsx"
import { MapPin, Edit, Trash2 } from "lucide-react"

interface Props {
    entry: TINEntry
    onClick: () => void
    editClicked: () => void
    deleteClicked: () => void
}

const TableRowMobile: React.FC<Props> = ({ entry, onClick, editClicked, deleteClicked }) => {
    return (
        <div
            key={entry.id}
            className="flex items-start justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
            onClick={onClick}
        >
            <div className="flex items-start space-x-3 w-[90%]">
                <div className="w-10 h-10 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center text-white font-medium text-md shadow-lg flex-shrink-0">
                    {entry.registeredName.charAt(0).toUpperCase()}
                </div>
                <div className="w-full min-w-0">
                    <span>{entry.registeredName}</span>
                    <div className="space-x-2 items-center py-1 mb-1">
            <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 mb-1 rounded inline-block">
              {entry.tin}
            </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {entry.isIndividual ? "Individual" : "Company"}
            </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {entry.isForeign ? "Foreign" : "Domestic"}
            </span>
                    </div>
                    <div className="flex items-start space-x-1">
                        <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 text-xs overflow-hidden">
                            <span className="block truncate font-medium text-gray-600">
                                {entry.address1 === "" ? "No address information available" : entry.address1}
                            </span>
                            <span className="block truncate text-grey-500">
                                {entry.address2}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-1 ml-2 items-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        editClicked();
                    }}
                    className="border-[#0097B2] text-[#0097B2] hover:bg-[#0097B2]/10 bg-white/80 backdrop-blur-sm h-6 w-6 p-0 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                    <Edit />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteClicked();
                    }}
                    className="border-red-400 text-red-400 hover:bg-red-400/10 bg-white/80 backdrop-blur-sm h-6 w-6 p-0 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                    <Trash2 />
                </Button>
            </div>
        </div>
    )
}

export default TableRowMobile
