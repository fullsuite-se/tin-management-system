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
        if (req.method !== "PUT") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const { id } = req.query as { id: string };
        const data = req.body as TinData;

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Invalid or missing document ID" });
        }

        if (!data) {
            return res.status(400).json({ message: "Missing request body" });
        }

        const success = await edit(data, id);

        if (success === "DUPLICATE_TIN") {
            return res.status(400).json({ message: 'TIN already exists' });
        }

        if (!success) {
            return res.status(400).json({ message: 'Invalid or incomplete data' });
        }

        return res.status(200).json({ message: "Entry edited successfully" });
    } catch (e) {
        const error = e instanceof Error ? e.message : e;

        return res.status(500).json({ message: 'Internal server error', error: error});
    }
}

async function edit(data: TinData, id: string): Promise<boolean | string> {
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
        const existing = await db
            .collection("tin-database").where("tin", "==", tin).get();

        const isDuplicate = existing.docs.some((doc) => doc.id !== id);

        if (isDuplicate) {
            console.warn("TIN already exists:", tin);
            return "DUPLICATE_TIN";
        }

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
