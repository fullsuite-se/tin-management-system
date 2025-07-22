import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal.tsx";
import { Button } from "../ui/Button.tsx";
import { Input } from "../ui/Input.tsx";
import { Label } from "../ui/Label.tsx";

interface ExportDataProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: (link: string) => void;
}

const ExportData: React.FC<ExportDataProps> = ({ isOpen, onClose, onExport }) => {
    const [link, setLink] = useState<string>("");
    const [isExportAttempted, setIsExportAttempted] = useState<boolean>(false);

    const handleSubmit = () => {
        setIsExportAttempted(true);
        if (!link) return;

        onExport(link);
        setLink("");
        setIsExportAttempted(false);
        onClose();
    };

    const handleClose = () => {
        setLink("");
        setIsExportAttempted(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalHeader onClose={handleClose}>
                <h3 className="text-lg font-semibold text-gray-800">Export Data To Google Sheets</h3>
            </ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    <Label className="text-gray-600 font-medium">Link to Google Spreadsheet *</Label>
                    <Input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter the link here"
                        className={isExportAttempted && !link ? "border-red-500" : ""}
                    />
                    {isExportAttempted && !link && (
                        <p className="text-xs text-red-500">Link is required.</p>
                    )}
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-[#0097B2] to-[#00B4D8] text-white hover:from-[#007A94] hover:to-[#0097B2]"
                        size="sm"
                        onClick={handleSubmit}
                    >
                        Export Data
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default ExportData;
