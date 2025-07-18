import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"

interface ExportDataProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: (link: string) => void;
}

const ExportData: React.FC<ExportDataProps> = ({ isOpen, onClose, onExport }) => {
    const [link, setLink] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!link) return;

        onExport(link);
    }

    const handleClose = () => {
        setLink(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalHeader onClose={onClose}>
                <span>Export Data To Google Sheets</span>
            </ModalHeader>
            <ModalBody>
                <div>
                    <Label>Link to Google SpreadSheet</Label>
                    <Input
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Link"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <div>
                    <Button
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                    >
                        Export Data
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default ExportData;