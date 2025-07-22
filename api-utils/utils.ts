import { Timestamp } from "firebase-admin/firestore";
import type { TinData } from "./tinData.ts";

export const checkTin = (entry: string) => {
    const parts = entry.split("-");

    if (parts.length !== 4) {
        throw new Error("Invalid Format: TIN must contain 4 parts separated by dashes");
    }

    if (!parts.every(part => /^\d+$/.test(part))) {
        throw new Error("Invalid Format: TIN must contain only numbers in each section");
    }

    if (!/^\d{3}-\d{3}-\d{3}-\d{4}$/.test(entry)) {
        throw new Error("Invalid Format: TIN must be in the form xxx-xxx-xxx-xxxx");
    }

    return true;
};

export function toTimestamp(entry: string | Date) {
    if (entry instanceof Date) {
        return Timestamp.fromDate(entry);
    }
    return Timestamp.fromDate(new Date(entry));
}

export const dataComplete = (data: TinData, type: string): boolean => {
    let requiredFields: (keyof TinData)[] = [
        "tin",
        "registeredName",
        "address1",
        "address2",
        "isIndividual",
        "isForeign",
        "createdBy",
        "createdAt"
    ];

    if (type === "edit") {
        requiredFields = [...requiredFields, "id", "editedBy", "editedAt"];
    }

    return requiredFields.every(field => data[field] != null);
}