import React from 'react'
import type { TINEntry } from '../../../utils/types.tsx'
import { Button } from "../../ui/button.tsx";
import { MapPin, Edit, Trash2 } from 'lucide-react'

interface Props {
    entry: TINEntry,
}

const TableRowDesktop: React.FC<Props> = ({ entry }) => {
    return (
        <>
            <td className="px-3 py-2 w-[32%]">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B4D8] rounded-full flex items-center justify-center text-white font-medium text-xs shadow-lg flex-shrink-0">
                        {entry.registeredName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <span className="block truncate text-sm font-medium text-gray-900">
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
            <td className="px-3 py-2 w-[13%]">
                <span
                    title={entry.tin}
                    className="bg-gradient-to-r from-slate-100 to-blue-50 px-2 py-1 rounded-lg text-xs font-mono text-gray-800 border border-slate-200 shadow-sm block whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {entry.tin}
                </span>
            </td>
            <td className="px-3 py-2 w-[45]">
                <div className="flex items-start space-x-1">
                    <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0 text-xs">
                        <span className="block truncate font-medium text-gray-600">
                            {entry.address1}
                        </span>
                        <span className="block truncate text-gray-500">
                            {entry.address2}
                        </span>
                    </div>
                </div>
            </td>
            <td className="px-3 py-2 w-[10%]">
                <div className="flex justify-end space-x-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('edit')}
                        className="border-[#0097B2] text-[#0097B2] hover:bg-[#0097B2]/10 bg-white/80 backdrop-blur-sm h-6 w-6 p-0 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('delete')}
                        className="border-red-400 text-red-400 hover:bg-red-400/10 bg-white/80 backdrop-blur-sm h-6 w-6 p-0 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </td>
        </>
    );
}

export default TableRowDesktop;