import { db } from "../../api-utils/firebase.js";
import type { TinData } from "../../api-utils/models/tinData.js";
import { toTimestamp } from "../../api-utils/utils.js";
import type {VercelRequest, VercelResponse} from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Handles CORS preflight
    }

    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const { id, data } = JSON.parse(req.body) as { id: string, data: TinData };

        if (!data) {
            return res.status(400).json({ message: "Missing request body" });
        }

        const success = await editEntry(data, id);

        if (!success) {
            return res.status(400).json({ message: 'Invalid or incomplete data' });
        }

        return res.status(200).json({ message: "Entry edited successfully" });
    } catch (e) {
        const error = e instanceof Error ? e.message : e;

        return res.status(500).json({ message: 'Internal server error', error: error});
    }
}

async function editEntry(data: TinData, id: string): Promise<boolean> {
    const {
        tin,
        registeredName,
        address1,
        address2,
        isIndividual,
        isForeign,
        editedBy,
        editedAt,
    } = data;

    if ([tin, registeredName, address1, address2, isIndividual, isForeign, editedBy, editedAt].some((field) => field == null)) {
        return false;
    }

    try {
        const toSave = {
            ...data,
            editedAt: editedAt ? toTimestamp(editedAt) : undefined,
        }

        await db.collection("tin-database").doc(id).set(toSave, { merge: true });
        return true;
    } catch (e) {
        console.error("Firestore write failed:", e);
        return false;
    }
}
