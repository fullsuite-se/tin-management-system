import React from 'react'
import type { TINEntry } from "../../utils/types.tsx";
// import { Button } from "./button.tsx";
// import { Edit, Trash2 } from 'lucide-react'

interface Props {
    entry: TINEntry,
}

const TableRow: React.FC<Props> = ({ entry }) => {
    if (entry) console.log('entry exists')

    return (
        <>
            <td className="px-3 py-2 w-[28%]">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center text-white font-medium text-xs shadow-lg flex-shrink-0">
                        {entry.registeredName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <span
                            className="block truncate text-sm font-medium text-gray-900"
                        >
                            {entry.registeredName}
                        </span>
                        <div className="space-x-2">
                        <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            {entry.isIndividual ? "Individual" : "Company"}
                        </span>
                            <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            {entry.isForeign ? "Foreign" : "Domestic"}
                        </span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-3 py-2 w-[16%]">
                <span
                    title={entry.tin}
                    className="bg-gradient-to-r from-slate-100 to-blue-50 px-2 py-1 rounded-lg text-xs font-mono text-gray-800 border border-slate-200 shadow-sm block whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {entry.tin}
                </span>
            </td>
        </>
    );
}

export default TableRow;