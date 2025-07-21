import { db } from "../../api-utils/firebase.js";
import { checkTin } from "../../api-utils/utils.js";
import type { TinData } from "../../api-utils/tinData.ts";
import { toTimestamp, dataComplete } from "../../api-utils/utils.js";
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
        if (req.method !== "POST") {
            const { status, ...body } = messages.methodNotAllowed;
            return res.status(status).json(body);
        }

        // request not received
        if (!req.body || Object.keys(req.body).length === 0) {
            const { status, ...body } = messages.requestNotSent;
            return res.status(status).json(body);
        }

        // obtain data
        const data: TinData = req.body;

        // check data completeness
        if (!dataComplete(data, "add")) {
            const { status, ...body } = messages.invalidOrIncompleteData;
            return res.status(status).json(body);
        }

        // receive the created id from firestore
        const id = await add(data);
        if (id === "DUPLICATE_TIN") {
            const { status, ...body } = messages.duplicateTIN;
            return res.status(status).json(body);
        }
        if (!id) {
            const { status, ...body } = messages.invalidOrIncompleteData;
            return res.status(status).json(body);
        }

        // return id
        const { status, ...body } = messages.entryAdded;
        return res.status(status).json({ body, id });
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);
        const { status, ...body } = messages.serverError(error);
        return res.status(status).json(body);
    }
}

async function add(data: TinData): Promise<string | null> {
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
        const existing = await db
            .collection("tin-database").where("tin", "==", tin).limit(1).get();

        if (!existing.empty) {
            console.warn("TIN already exists:", tin);
            return "DUPLICATE_TIN";
        }

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