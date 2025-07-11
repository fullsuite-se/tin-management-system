import { db } from "../../api-utils/firebase.js";
import type { TinData } from "../../api-utils/models/tinData.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const id = req.query.id;

    if (typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({ message: "Missing or invalid document ID in query" });
    }

    try {
        const result = await retrieveEntry(id);

        if (!result) {
            return res.status(404).json({ message: "Entry not found" });
        }

        return res.status(200).json({ message: "Entry retrieved successfully", data: result });
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);

        return res.status(500).json({ message: "Internal server error", error });
    }
}

async function retrieveEntry(id: string): Promise<TinData | null> {
    try {
        const doc = await db.collection("tin-database").doc(id).get();

        if (!doc.exists) {
            return null;
        }

        return doc.data() as TinData;
    } catch (e) {
        console.error("Firestore read failed:", e);
        return null;
    }
}