import { db } from "../../api-utils/firebase.ts";
import type { TinData } from "../../api-utils/tinData.ts";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { messages } from "../../api-utils/messages.ts";

export default async function (req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Handles CORS preflight
    }

    try {
        // invalid method
        if (req.method !== "GET") {
            const { status, ...body } = messages.methodNotAllowed;
            return res.status(status).json(body);
        }

        // obtain data
        const id = req.query.id;

        if (typeof id === "string" && id.trim() !== "") {
            const result = await retrieve(id);

            if (!result) {
                const { status, ...body } = messages.entryNotFound;
                return res.status(status).json(body);
            }

            const { status, ...body } = messages.entryFound
            return res.status(status).json({ ...body, ...result });
        } else {
            const allEntries = await retrieveAllEntries();

            if (!allEntries) {
                const { status, ...body } = messages.entriesNotFound;
                return res.status(status).json(body);
            }

            const { status, ...body } = messages.entriesFound;
            return res.status(status).json({ ...body, data: allEntries });
        }
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        const { status, ...body } = messages.serverError(error);
        return res.status(status).json(body);
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