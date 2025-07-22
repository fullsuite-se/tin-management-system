import { db } from "../../api-utils/firebase.ts";
import type { TinData } from "../../api-utils/tinData.ts";
import { toTimestamp, dataComplete } from "../../api-utils/utils.ts";
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
        if (req.method !== "PUT") {
            const { status, ...body } = messages.methodNotAllowed;
            return res.status(status).json(body);
        }

        // request not received
        if (!req.query || !req.body || Object.keys(req.body).length === 0) {
            const { status, ...body } = messages.requestNotSent;
            return res.status(status).json(body);
        }

        // obtain data
        const { id } = req.query as { id: string };
        const data = req.body as TinData;

        // check data completeness
        if (!id || typeof id !== "string") {
            const { status, ...body } = messages.invalidOrIncompleteData;
            return res.status(status).json(body);
        }
        if (!dataComplete(data, "edit")) {
            const { status, ...body } = messages.invalidOrIncompleteData;
            return res.status(status).json(body);
        }

        // receive edit status
        const success = await edit(data, id);
        if (success === "DUPLICATE_TIN") {
            const { status, ...body } = messages.duplicateTIN;
            return res.status(status).json(body);
        }
        if (!success) {
            const { status, ...body } = messages.invalidOrIncompleteData;
            return res.status(status).json(body);
        }

        // edit successful
        const { status, ...body } = messages.entryEdited;
        return res.status(status).json({ ...body, id });
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        const { status, ...body } = messages.serverError(error);
        return res.status(status).json(body);
    }
}

async function edit(data: TinData, id: string): Promise<boolean | string> {
    const {
        tin,
        registeredName,
        address1,
        address2,
        isIndividual,
        isForeign,
        editedBy,
        editedAt,
    } = data;

    if ([tin, registeredName, address1, address2, isIndividual, isForeign, editedBy, editedAt].some((field) => field == null)) {
        return false;
    }

    try {
        const existing = await db
            .collection("tin-database").where("tin", "==", tin).get();

        const isDuplicate = existing.docs.some((doc) => doc.id !== id);

        if (isDuplicate) {
            console.warn("TIN already exists:", tin);
            return "DUPLICATE_TIN";
        }

        const toSave = {
            ...data,
            editedAt: editedAt ? toTimestamp(editedAt) : undefined,
        }

        await db.collection("tin-database").doc(id).update(toSave);
        return true;
    } catch (e) {
        console.error("Firestore write failed:", e);
        return false;
    }
}
