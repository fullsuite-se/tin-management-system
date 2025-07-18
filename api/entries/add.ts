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
            return res.status(405).json({
                title: "Wrong Move!",
                message: "This action isn't allowed here. Try refreshing the page or go back the proper way. If the issue persists, let us know!" });
        }

        const data: TinData = req.body;

        if (!data) {
            return res.status(400).json({
                title: "Entry Not Sent",
                message: "It seems your entry was not sent. Please try again." });
        }

        const id = await add(data);

        if (id === "DUPLICATE_TIN") {
            return res.status(400).json({
                title: "Duplicate TIN",
                message: "Looks like that TIN's already taken. Mind double-checking?" });
        }

        if (!id) {
            return res.status(400).json({
                title: "Invalid or Incomplete Data",
                message: "Looks like the entry we received was incomplete or invalid. Please try again." });
        }

        return res.status(200).json({
            title: "Entry Added",
            message: "Your entry was successfully added, cheers!!!",
            id
        });
    } catch (e) {
        const error = e instanceof Error ? e.message : e;

        return res.status(500).json({
            title: "Something Went Wrong",
            message: "An unexpected error occurred on our end. We're working to resolve it. Please try again later.",
            error: error });
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