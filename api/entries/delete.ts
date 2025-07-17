import { db } from "../../api-utils/firebase.js";
import type {VercelRequest, VercelResponse} from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Handles CORS preflight
    }

    try {
        if (req.method !== "DELETE") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const id = req.query.id;

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Missing document ID" });
        }

        const success = await deleteEntry(id);

        if (!success) {
            return res.status(404).json({ message: "Document not found or failed to delete" });
        }

        return res.status(200).json({ message: "Entry deleted successfully" });
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        return res.status(500).json({ message: "Internal server error", error });
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