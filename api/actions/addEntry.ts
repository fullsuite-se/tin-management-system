import { db } from "../../api-utils/firebase.js";
import { checkTin } from "../../api-utils/utils.js";
import type { TinData } from "../../api-utils/models/tinData.js";
import { toTimestamp } from "../../api-utils/utils.js";
import type {VercelRequest, VercelResponse} from "@vercel/node";

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const data: TinData = JSON.parse(req.body);

        if (!data) {
            return res.status(400).json({ message: "Missing request body" });
        }

        const success = await addEntry(data);

        if (!success) {
            return res.status(400).json({ message: 'Invalid or incomplete data' });
        }

        return res.status(200).json({ message: "Entry added successfully" });
    } catch (e) {
        const error = e instanceof Error ? e.message : e;

        return res.status(500).json({ message: 'Internal server error', error: error});
    }
}

async function addEntry(data: TinData): Promise<boolean> {
    const {
        tin,
        registeredName,
        address1,
        address2,
        isIndividual,
        isForeign,
        createdBy,
        createdAt,
    } = data;

    if ([tin, registeredName, address1, address2, isIndividual, isForeign, createdBy, createdAt].some((field) => field == null)) {
        return false;
    }

    // check if TIN is valid
    if (!checkTin(tin)) {
        return false;
    }

    try {
        const toAdd = {
            ...data,
            createdAt: toTimestamp(createdAt),
        }

        await db.collection("tin-database").add(toAdd);
        return true;
    } catch (e) {
        console.error("Firestore write failed:", e);
        return false;
    }
}