"use client"

import * as React from "react"
import { Button } from "../ui/Button"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal"
import { HelpCircle, Shield, Database, Search, Plus, Edit } from "lucide-react"

interface UserManualProps {
    isOpen: boolean
    onClose: () => void
}

export const UserManual: React.FC<UserManualProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader onClose={onClose}>
                <div className="flex items-center">
                    <HelpCircle className="h-6 w-6 mr-2 text-[#0097B2]" />
                    TIN Database Management System - User Manual
                </div>
            </ModalHeader>

            <ModalBody className="max-h-[80vh] overflow-auto">
                <div className="space-y-6 text-sm">
                    {/* Getting Started */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <Shield className="h-5 w-5 mr-2 text-[#0097B2]" />
                            Getting Started
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Access Requirements:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>
                                    Only users with <strong>@getfullsuite.com</strong> or <strong>@viascari.com</strong> email domains
                                    can access
                                </li>
                                <li>Use your work email password to log in</li>
                                <li>Contact your administrator if you need access</li>
                            </ul>
                        </div>
                    </section>

                    {/* Dashboard Overview */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <Database className="h-5 w-5 mr-2 text-[#0097B2]" />
                            Dashboard Overview
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Client Directory</h4>
                            <p className="text-gray-600">Browse, search, and manage all client records in one place.</p>
                        </div>
                    </section>

                    {/* Adding Clients */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <Plus className="h-5 w-5 mr-2 text-[#0097B2]" />
                            Adding New Clients
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-[#0097B2] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-medium">Click "Add Client" button</p>
                                        <p className="text-gray-600">Located in the top-right of the client directory</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-[#0097B2] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-medium">Choose client type</p>
                                        <p className="text-gray-600">Select between "Company" or "Individual" tabs</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-[#0097B2] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-medium">Fill required information</p>
                                        <p className="text-gray-600">Enter name, TIN (xxx-xxx-xxx-xxxx format), and at least one address</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-[#0097B2] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        4
                                    </div>
                                    <div>
                                        <p className="font-medium">Select entity type</p>
                                        <p className="text-gray-600">Choose "Domestic" or "Foreign" classification</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Managing Records */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <Edit className="h-5 w-5 mr-2 text-[#0097B2]" />
                            Managing Records
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <h4 className="font-medium text-[#0097B2] mb-2">View Details</h4>
                                <p className="text-gray-600">Click any row to view complete client information</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border ">
                                <h4 className="font-medium text-[#0097B2] mb-2">Edit Records</h4>
                                <p className="text-gray-600">Use the edit button (pencil icon) to modify client data</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border ">
                                <h4 className="font-medium text-[#0097B2] mb-2">Delete Records</h4>
                                <p className="text-gray-600">Use the delete button (trash icon) to remove clients</p>
                            </div>
                        </div>
                    </section>

                    {/* Search and Filter */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <Search className="h-5 w-5 mr-2 text-[#0097B2]" />
                            Search and Navigation
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-600 mb-2">Search Functionality</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Search by client name, TIN number, or address</li>
                                <li>Results update automatically as you type</li>
                                <li>Use pagination controls to navigate through results</li>
                                <li>Adjust items per page (10, 25, or 50 records)</li>
                            </ul>
                        </div>
                    </section>

                    {/* Important Notes */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">⚠️ Important Notes</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>
                                    <strong>TIN Format:</strong> Must be in xxx-xxx-xxx-xxxx format (TIN with branch code)
                                </li>
                                <li>
                                    <strong>Address Requirements:</strong> At least one address field must be filled
                                </li>
                                <li>
                                    <strong>Data Security:</strong> All changes are tracked with user information and timestamps
                                </li>
                                <li>
                                    <strong>Access Control:</strong> Only authorized domain users can access the system
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Support */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">📞 Support</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                For technical support or access issues, please contact your system administrator or IT support team at
                                your organization.
                            </p>
                        </div>
                    </section>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose} className="bg-gradient-to-l from-[#0097B2] to-[#00B4D8] text-white">
                    Close Manual
                </Button>
            </ModalFooter>
        </Modal>
    )
}
