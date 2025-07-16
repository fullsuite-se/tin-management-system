import { db } from "../../api-utils/firebase.js";
import { checkTin } from "../../api-utils/utils.js";
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

        const data: TinData = req.body;

        if (!data) {
            return res.status(400).json({ message: "Missing request body" });
        }

        const id = await addEntry(data);

        if (!id) {
            return res.status(400).json({ message: 'Invalid or incomplete data' });
        }

        return res.status(200).json({ message: "Entry added successfully", id });
    } catch (e) {
        const error = e instanceof Error ? e.message : e;

        return res.status(500).json({ message: "Internal server error", error: error});
    }
}

async function addEntry(data: TinData): Promise<string | null> {
    const {
        tin,
        registeredName,
        address1,
        address2,
        createdBy,
        createdAt,
    } = data;

    if ([tin, registeredName, address1, address2, createdBy, createdAt].some((field) => field == null)) {
        return null;
    }

    // check if TIN is valid
    if (!checkTin(tin)) {
        return null;
    }

    try {
        const toAdd = {
            ...data,
            createdAt: toTimestamp(createdAt),
        }

        const docRef = await db.collection("tin-database").add(toAdd);
        return docRef.id;
    } catch (e) {
        console.error("Firestore write failed:", e);
        return null;
    }
}