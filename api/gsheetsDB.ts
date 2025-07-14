import { db } from "../api-utils/firebase.js";
import type { TinData } from "../api-utils/models/tinData.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type TinResult = {
    tin: string,
    registeredName: string,
    lastName: string,
    firstName: string,
    middleName: string,
    address1: string,
    address2: string,
}

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const tins = JSON.parse(req.body) as TinData[];

        if (!Array.isArray(tins) || tins.some(tin => typeof tin !== "string")) {
            return res.status(400).json({ message: "Invalid payload: 'tins' must be an array of strings" });
        }

        const CHUNK_SIZE = 10;
        const results: TinResult[] = [];

        for (let i = 0; i < tins.length; i += CHUNK_SIZE) {
            const chunk = tins.slice(i, i + CHUNK_SIZE);

            const snapshot = await db.collection("tin-database")
                .where("tin", "in", chunk)
                .get();

            snapshot.forEach(doc => {
                const data = doc.data();
                const nameParts = data.registeredName?.split(',') || [];

                results.push({
                    tin: data.tin ?? '',
                    registeredName: data.isIndividual ? '' : data.registeredName ?? '',
                    lastName: data.isIndividual ? (nameParts[0]?.trim() || '') : '',
                    firstName: data.isIndividual ? (nameParts[1]?.trim() || '') : '',
                    middleName: data.isIndividual ? (nameParts[2]?.trim() || '') : '',
                    address1: data.address1 ?? '',
                    address2: data.address2 ?? '',
                });
            });
        }

        return res.status(200).json({ message: "Entries retrieved", data: results });
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);

        return res.status(500).json({ message: "Internal server error", error });
    }
}