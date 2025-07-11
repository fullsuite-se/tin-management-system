// "use client"
//
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
// import { Button } from "./ui/Button.tsx"
// import { Label } from "./ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
//
// interface FilterState {
//     entityType: string
//     classification: string
//     dateRange: string
// }
//
// interface FilterDialogProps {
//     isOpen: boolean
//     onClose: () => void
//     filters: FilterState
//     onFiltersChange: (filters: FilterState) => void
//     onClearFilters: () => void
// }
//
// export default function FilterDialog({ isOpen, onClose, filters, onFiltersChange, onClearFilters }: FilterDialogProps) {
//     const handleFilterChange = (key: keyof FilterState, value: string) => {
//         onFiltersChange({
//             ...filters,
//             [key]: value,
//         })
//     }
//
//     const handleApplyFilters = () => {
//         onClose()
//     }
//
//     const handleClearAll = () => {
//         onClearFilters()
//     }
//
//     // const handleFiltersChange = (newFilters: FilterState) => {
//     //     setFilters(newFilters);
//     // };
//
//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="w-[95vw] max-w-md mx-auto">
//                 <DialogHeader>
//                     <DialogTitle className="text-lg font-semibold text-gray-900">Filter Clients</DialogTitle>
//                 </DialogHeader>
//
//                 <div className="space-y-4">
//                     {/* Entity Type Filter */}
//                     <div className="space-y-2">
//                         <Label className="text-sm font-medium text-gray-700">Entity Type</Label>
//                         <Select value={filters.entityType} onValueChange={(value) => handleFilterChange("entityType", value)}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select entity type" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">All Types</SelectItem>
//                                 <SelectItem value="company">Company</SelectItem>
//                                 <SelectItem value="individual">Individual</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//
//                     {/* Classification Filter */}
//                     <div className="space-y-2">
//                         <Label className="text-sm font-medium text-gray-700">Classification</Label>
//                         <Select
//                             value={filters.classification}
//                             onValueChange={(value) => handleFilterChange("classification", value)}
//                         >
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select classification" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">All Classifications</SelectItem>
//                                 <SelectItem value="domestic">Domestic</SelectItem>
//                                 <SelectItem value="foreign">Foreign</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//
//                     {/* Date Range Filter */}
//                     <div className="space-y-2">
//                         <Label className="text-sm font-medium text-gray-700">Date Added</Label>
//                         <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select date range" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">All Time</SelectItem>
//                                 <SelectItem value="week">Last Week</SelectItem>
//                                 <SelectItem value="month">Last Month</SelectItem>
//                                 <SelectItem value="year">Last Year</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </div>
//
//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
//                     <Button variant="outline" onClick={handleClearAll} className="flex-1 bg-transparent hover:bg-gray-50">
//                         Clear All
//                     </Button>
//                     <Button onClick={handleApplyFilters} className="flex-1 bg-[#0097B2] hover:bg-[#007A94] text-white">
//                         Apply Filters
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }
