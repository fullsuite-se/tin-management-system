import { db } from "../../api-utils/firebase.js";
import type {VercelRequest, VercelResponse} from "@vercel/node";
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
        if (req.method !== "DELETE") {
            const { status, ...body } = messages.methodNotAllowed;
            return res.status(status).json(body);
        }

        // request not received
        if (!req.query || !req.body || Object.keys(req.body).length === 0) {
            const { status, ...body } = messages.requestNotSent;
            return res.status(status).json(body);
        }

        // obtain data
        const id = req.query.id;

        // check data
        if (!id || typeof id !== "string") {
            const { status, ...body } = messages.invalidOrIncompleteData;
            return res.status(status).json(body);
        }

        // receive deletion status
        const success = await deleteEntry(id);
        if (!success) {
            const { status, ...body } = messages.entryNotFound;
            return res.status(status).json(body);
        }

        const { status, ...body } = messages.entryDeleted;
        return res.status(status).json({ body });
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        const { status, ...body } = messages.serverError(error);
        return res.status(status).json(body);
    }
}

async function deleteEntry(id: string): Promise<boolean> {
    try {
        const docRef = db.collection("tin-database").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return false;
        }

        await docRef.delete();
        return true;
    } catch (e) {
        console.error("Firestore delete failed:", e);
        return false;
    }
}