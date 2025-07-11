import { Timestamp } from "firebase-admin/firestore";

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