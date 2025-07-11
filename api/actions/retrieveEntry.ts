import { db } from "../../shared/firebase.js";
import type { TinData } from "../../shared/models/tinData.js";
import type {VercelRequest, VercelResponse} from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    if (req.body) {
        try {
            const result = await retrieveEntry(req.body);

            if (!result) {
                return res.status(404).json({ message: 'Entry not found or invalid TIN' });
            }
            return res.status(200).json({ message: 'Entry retrieved successfully', data: result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

async function retrieveEntry(data: { tin: string }): Promise<TinData | null> {
    const { tin } = data;

    if (!tin || typeof tin !== "string" || tin.trim() === "") {
        return null;
    }

    try {
        const doc = await db.collection("tin-database").doc(tin).get();

        if (!doc.exists) {
            return null;
        }

        return doc.data() as TinData;
    } catch (error) {
        console.error("Firestore read failed:", error);
        return null;
    }
}
