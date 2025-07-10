import React from "react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/input";
import Tabs from "../ui/Tabs";

interface AddClientProps {
    isOpen: boolean,
    onClose: () => void,
    // onSubmit: () => void,
}

const AddClient: React.FC<AddClientProps> = ({ isOpen, onClose }) => {
    const [selectedTab, setSelectedTab] = useState<string>("");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>
                Add New Client
            </ModalHeader>
            <ModalBody>
                <Tabs active={selectedTab}
                      onChange={setSelectedTab}
                      options={["Company", "Individual"]} />
                <Input placeholder="Name" />
                <Input placeholder="TIN" />
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="outline"
                >Cancel</Button>
                <Button
                    variant="default"
                >Save</Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddClient;