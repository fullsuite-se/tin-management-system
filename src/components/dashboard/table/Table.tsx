import React from 'react'
import type {ModalState, TINEntry} from "../../../lib/types.tsx";
import TableRowDesktop from "./TableRowDesktop.tsx";
import TableRowMobile from "./TableRowMobile.tsx";

interface Props {
    entries: TINEntry[],
    setModal: (modal: ModalState) => void,
}

const Table: React.FC<Props> = ({ entries, setModal }) => {
    return (
        <>
            <div className="hidden md:flex flex-1">
                <table className="w-full table-fixed">
                    <thead
                        className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-gray-200 sticky top-0 z-10">
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
                    <tbody className="overflow-y-auto">
                    {entries.map((entry: TINEntry, index: number) => (
                        <tr
                            key={entry.id}
                            className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent cursor-pointer transition-all duration-200 ${
                                index % 2 === 0 ? "bg-white/50" : "bg-gradient-to-r from-slate-50/30 to-transparent"
                            }`}
                            onClick={() => setModal({type: "view", entry: entry})}
                        >
                            <TableRowDesktop
                                entry={entry}
                                editClicked={() => setModal({type: "edit", entry: entry})}
                                deleteClicked={() => setModal({type: "delete", entry: entry})}
                            />
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex md:hidden flex-1 flex-col overflow-y-auto p-3 space-y-2">
                {entries.map((entry: TINEntry) => (
                    <TableRowMobile
                        entry={entry}
                        onClick={() => setModal({type: "view", entry: entry})}
                        editClicked={() => setModal({type: "edit", entry: entry})}
                        deleteClicked={() => setModal({type: "delete", entry: entry})}
                    />
                ))}
            </div>
        </>

    );
}

export default Table;
