// import React from 'react'
// import { useState, useEffect } from 'react'
// import Header from './Header.tsx'
// import type { TINEntry } from "../../lib/types.tsx";
// import { generateMockData } from "../../lib/utils.ts";
// import TableHeader from "./table/TableHeader.tsx";
// import Table from "./table/Table.tsx";
// import Pagination from "./table/Pagination.tsx";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.tsx";
// import { Label } from "../../components/ui/label.tsx";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select.tsx";
// import { Button } from "../ui/Button.tsx";
// import ViewClientDialog from "../../components/ViewClientDialog.tsx";
// import AddClientDialog from "../../components/AddClientDialog.tsx";
// import DeleteConfirmDialog from "../../components/DeleteConfirmDialog.tsx";
// import EditClientDialog from "../EditClientDialog.tsx";
//
//
// interface Props {
//     name: string,
//     email: string,
//     avatar: string,
//     onLogout: () => void
// }
//
// interface FilterState {
//     entityType: string
//     classification: string
//     dateRange: string
// }
//
// const Dashboard: React.FC<Props> = ({name, email, avatar, onLogout}) => {
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [entries, setEntries] = useState<TINEntry[]>([]);
//     const [currentEntries, setCurrentEntries] = useState<TINEntry[]>([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [editingEntry, setEditingEntry] = useState<TINEntry | null>(null)
//     const [deleteEntry, setDeleteEntry] = useState<TINEntry | null>(null)
//     const [viewEntry, setViewEntry] = useState<TINEntry | null>(null)
//     const [showFilters, setShowFilters] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [filteredEntries, setFilteredEntries] = useState<TINEntry[]>([]);
//     const [filters, setFilters] = useState<FilterState>({
//         entityType: "all",
//         classification: "all",
//         dateRange: "all",
//     });
//
//     // Initialize with mock data
//     useEffect(() => {
//         const mockData = generateMockData()
//         setEntries(mockData)
//     }, [])
//
//     const clearFilters = () => {
//         setFilters({
//             entityType: "all",
//             classification: "all",
//             dateRange: "all",
//         })
//     }
//
//     const hasActiveFilters =
//         filters.entityType !== "all" || filters.classification !== "all" || filters.dateRange !== "all"
//
//     // Filter entries based on search term and filters
//     useEffect(() => {
//         let filtered = entries.filter(
//             (entry) =>
//                 entry.tin.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 entry.registeredName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 entry.address1.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 entry.address2.toLowerCase().includes(searchTerm.toLowerCase()),
//         )
//
//         // Apply entity type filter
//         if (filters.entityType !== "all") {
//             filtered = filtered.filter((entry) =>
//                 filters.entityType === "individual" ? entry.isIndividual : !entry.isIndividual,
//             )
//         }
//
//         // Apply classification filter
//         if (filters.classification !== "all") {
//             filtered = filtered.filter((entry) => (filters.classification === "foreign" ? entry.isForeign : !entry.isForeign))
//         }
//
//         // Apply date range filter
//         if (filters.dateRange !== "all") {
//             const now = new Date()
//             const filterDate = new Date()
//
//             switch (filters.dateRange) {
//                 case "week":
//                     filterDate.setDate(now.getDate() - 7)
//                     break
//                 case "month":
//                     filterDate.setMonth(now.getMonth() - 1)
//                     break
//                 case "year":
//                     filterDate.setFullYear(now.getFullYear() - 1)
//                     break
//             }
//
//             filtered = filtered.filter((entry) => new Date(entry.createdAt) >= filterDate)
//         }
//
//         setFilteredEntries(filtered)
//         setCurrentPage(1)
//     }, [entries, searchTerm, filters])
//
//     const handleAdd = (newEntry: Omit<TINEntry, "id" | "createdAt" | "createdBy">) => {
//         const entry: TINEntry = {
//             ...newEntry,
//             id: (entries.length + 1).toString(),
//             createdAt: new Date(),
//             createdBy: email,
//         }
//         setEntries([entry, ...entries])
//     }
//
//     const handleUpdate = (updatedEntry: TINEntry) => {
//         setEntries(
//             entries.map((entry) =>
//                 entry.id === updatedEntry.id
//                     ? {
//                         ...updatedEntry,
//                         editedBy: email,
//                         editedAt: new Date(),
//                     }
//                     : entry,
//             ),
//         )
//     }
//
//     const handleDelete = (entry: TINEntry) => {
//         setEntries(entries.filter((e) => e.id !== entry.id))
//         setDeleteEntry(null)
//     }
//
//     const handleEdit = (entry: TINEntry) => {
//         setEditingEntry(entry)
//         setIsFormOpen(true)
//     }
//
//     const handleFormClose = () => {
//         setIsFormOpen(false)
//         setEditingEntry(null)
//     }
//
//     return (
//         <>
//             {/* Desktop */}
//             <div className="hidden md:block">
//                 <div
//                     className="hidden md:block min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
//                     <div className="max-w-7xl mx-auto md:p-3 space-y-3">
//                         <Header name={name} email={email} avatar={avatar} onLogout={onLogout}/>
//
//                         <div
//                             className="flex flex-col h-[calc(100vh-120px)] bg-white/80 backdrop-blur-sm md:rounded-xl shadow-lg border border-white/50">
//                             <TableHeader
//                                 searchTerm={searchTerm}
//                                 totalEntries={entries.length}
//                                 filteredEntries={filteredEntries.length}
//                                 hasActiveFilters={hasActiveFilters}
//                                 filters={filters}
//                                 setIsFormOpen={setIsFormOpen}
//                                 setSearchTerm={setSearchTerm}
//                                 setShowFilters={setShowFilters}
//                                 clearFilters={clearFilters}
//                             />
//
//                             <div className="flex flex-1 flex-col overflow-hidden">
//                                 <Table entries={currentEntries} setViewEntry={setViewEntry} handleEdit={handleEdit}/>
//
//                                 <Pagination
//                                     filteredEntries={filteredEntries}
//                                     currentPage={currentPage}
//                                     itemsPerPage={itemsPerPage}
//                                     setCurrentPage={setCurrentPage}
//                                     setCurrentEntries={setCurrentEntries}
//                                     setItemsPerPage={setItemsPerPage}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Mobile */}
//             <div className="block md:hidden">
//                 <div className="min-h-screen bg-gray-50">
//                     <div className="flex flex-col h-screen">
//                         <Header name={name} email={email} avatar={avatar} onLogout={onLogout}/>
//
//                         <TableHeader
//                             searchTerm={searchTerm}
//                             totalEntries={entries.length}
//                             filteredEntries={filteredEntries.length}
//                             hasActiveFilters={hasActiveFilters}
//                             filters={filters}
//                             setIsFormOpen={setIsFormOpen}
//                             setSearchTerm={setSearchTerm}
//                             setShowFilters={setShowFilters}
//                             clearFilters={clearFilters}
//                         />
//
//                         <Table entries={currentEntries} setViewEntry={setViewEntry} handleEdit={handleEdit}/>
//
//                         <Pagination
//                             filteredEntries={filteredEntries}
//                             currentPage={currentPage}
//                             itemsPerPage={itemsPerPage}
//                             setCurrentPage={setCurrentPage}
//                             setCurrentEntries={setCurrentEntries}
//                             setItemsPerPage={setItemsPerPage}
//                         />
//                     </div>
//                 </div>
//             </div>
//
//             {/* DIALOGS */}
//
//             {/* Filter Dialog */}
//             <Dialog open={showFilters} onOpenChange={setShowFilters}>
//                 <DialogContent className="w-[95vw] max-w-sm mx-auto">
//                     <DialogHeader>
//                         <DialogTitle className="text-lg font-semibold">Filter Clients</DialogTitle>
//                     </DialogHeader>
//
//                     <div className="space-y-4">
//                         <div className="space-y-2">
//                             <Label className="text-sm font-medium">Entity Type</Label>
//                             <Select
//                                 value={filters.entityType}
//                                 onValueChange={(value) => setFilters({...filters, entityType: value})}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue/>
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="all">All Types</SelectItem>
//                                     <SelectItem value="company">Company</SelectItem>
//                                     <SelectItem value="individual">Individual</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//
//                         <div className="space-y-2">
//                             <Label className="text-sm font-medium">Classification</Label>
//                             <Select
//                                 value={filters.classification}
//                                 onValueChange={(value) => setFilters({...filters, classification: value})}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue/>
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="all">All Classifications</SelectItem>
//                                     <SelectItem value="domestic">Domestic</SelectItem>
//                                     <SelectItem value="foreign">Foreign</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//
//                         <div className="space-y-2">
//                             <Label className="text-sm font-medium">Date Added</Label>
//                             <Select
//                                 value={filters.dateRange}
//                                 onValueChange={(value) => setFilters({...filters, dateRange: value})}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue/>
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="all">All Time</SelectItem>
//                                     <SelectItem value="week">Last Week</SelectItem>
//                                     <SelectItem value="month">Last Month</SelectItem>
//                                     <SelectItem value="year">Last Year</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>
//
//                     <div className="flex gap-2 pt-4">
//                         <Button variant="outline" onClick={clearFilters} className="flex-1 bg-transparent">
//                             Clear All
//                         </Button>
//                         <Button onClick={() => setShowFilters(false)}
//                                 className="flex-1 bg-[#0097B2] hover:bg-[#007A94]">
//                             Apply
//                         </Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//
//             {/* Other Dialogs */}
//             <AddClientDialog
//                 isOpen={isFormOpen}
//                 onClose={handleFormClose}
//                 onSubmit={handleAdd}
//             />
//
//             <EditClientDialog
//                 isOpen={isFormOpen}
//                 onClose={handleFormClose}
//                 onSubmit={editingEntry ? handleUpdate : handleAdd}
//                 entry={editingEntry}
//             />
//
//             <DeleteConfirmDialog
//                 isOpen={!!deleteEntry}
//                 onClose={() => setDeleteEntry(null)}
//                 onConfirm={() => deleteEntry && handleDelete(deleteEntry)}
//             />
//
//             <ViewClientDialog isOpen={!!viewEntry} onClose={() => setViewEntry(null)} entry={viewEntry} />
//         </>
//     );
// }
//
// export default Dashboard;