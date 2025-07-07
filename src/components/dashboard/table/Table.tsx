import React from 'react'
import type {TINEntry} from "../../../utils/types.tsx";
import TableRow from "../../ui/tableRow.tsx";

interface Props {
    entries: TINEntry[],
}

const Table: React.FC<Props> = ({ entries }) => {
    if (entries) console.log('1')

    return (
        <div>
            <table className="w-full table-fixed">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700 text-xs w-[32%]">
                        Registered Name
                    </th>
                    <th className="text-center px-3 py-2 font-semibold text-gray-700 text-xs w-[13%]">
                        TIN With Branch Code
                    </th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700 text-xs w-[45%]">
                        Address
                    </th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700 text-xs w-[10%]">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {entries.map((entry: TINEntry, index: number) => (
                    <tr
                        key={entry.id}
                        className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent cursor-pointer transition-all duration-200 ${
                            index % 2 === 0 ? "bg-white/50" : "bg-gradient-to-r from-slate-50/30 to-transparent"
                        }`}
                        onClick={() => console.log('clicked')}
                    >
                        <TableRow entry={entry} />
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
