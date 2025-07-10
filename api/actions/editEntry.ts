import { db } from "../utils/firebase";
import { TinData } from "../../shared/models/tinData";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const success: boolean = await editEntry(req.body as TinData);

        if (!success) {
            return res.status(400).json({ message: 'Invalid or incomplete data' });
        }

        return res.status(200).json({ message: "Entry edited successfully" });
    } catch (error) {
        console.error("Edit entry failed:", error);
        return res.status(500).json({ message: 'Server error while editing entry' });
    }
}

async function editEntry(data: TinData): Promise<boolean> {
    const {
        tin,
        registeredName,
        address1,
        address2,
        isIndividual,
        isForeign,
        createdBy,
        createdAt,
    } = data;

    if ([tin, registeredName, address1, address2, isIndividual, isForeign, createdBy, createdAt].some(field => field == null)) {
        return false;
    }

    if (typeof isIndividual !== "boolean" || typeof isForeign !== "boolean") {
        return false;
    }

    try {
        await db.collection("tin-database").doc(tin).set(data, { merge: true });
        return true;
    } catch (error) {
        console.error("Firestore write failed. Please try again later.", error);
        return false;
    }
}
