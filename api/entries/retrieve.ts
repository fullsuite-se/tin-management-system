import { db } from "../../api-utils/firebase.js";
import type { TinData } from "../../api-utils/models/tinData.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Handles CORS preflight
    }

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const id = req.query.id;

    try {
        if (typeof id === "string" && id.trim() !== "") {
            const result = await retrieve(id);

            if (!result) {
                return res.status(404).json({ message: "Entry not found" });
            }

            return res.status(200).json({ message: "Entry retrieved successfully", data: result });
        } else {
            const allEntries = await retrieveAllEntries();

            if (!allEntries) {
                return res.status(404).json({ message: "Entries not found" });
            }

            return res.status(200).json({ message: "Entries retrieved successfully", data: allEntries });
        }
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);

        return res.status(500).json({ message: "Internal server error", error });
    }
}

async function retrieve(id: string): Promise<TinData | null> {
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

async function retrieveAllEntries(): Promise<TinData[]> {
    const snapshot = await db.collection("tin-database").get();
    const results: TinData[] = [];

    snapshot.forEach(doc => {
        const data = doc.data();
        results.push({
            ...data,
            id: doc.id,
            createdAt: data.createdAt?.toDate?.() ?? new Date(),
            editedAt: data.editedAt?.toDate?.() ?? null,
        } as TinData);
    });

    return results;
}