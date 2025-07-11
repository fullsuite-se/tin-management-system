import { db } from "../../shared/firebase.js";
import type {VercelRequest, VercelResponse} from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    if (req.body) {
        try {
            const success = await deleteEntry(req.body);

            if (!success) {
                return res.status(400).json({ message: 'Invalid or incomplete data' });
            }

            return res.status(200).json({ message: 'Entry deleted successfully' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

async function deleteEntry(data: { tin: string }): Promise<boolean> {
    const { tin } = data;

    if (!tin || typeof tin !== "string" || tin.trim() === "") {
        return false;
    }

    try {
        const docRef = db.collection("tin-database").doc(tin);
        const doc = await docRef.get();

        if (!doc.exists) {
            return false;
        }

        await docRef.delete();
        return true;
    } catch (error) {
        console.error("Firestore delete failed:", error);
        return false;
    }
}