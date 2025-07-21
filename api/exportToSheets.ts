import { google } from "googleapis";
import { db } from "../api-utils/firebase.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { messages } from "../api-utils/messages.ts";

export default async (req: VercelRequest, res: VercelResponse) => {
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

        const { sheetUrl } = req.body;
        const sheetId = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];

        if (!sheetId) {
            const { status, ...body } = messages.invalidSheetUrl;
            return res.status(status).json(body);
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.SHEETS_CLIENT_EMAIL,
                private_key: process.env.SHEETS_PRIVATE_KEY,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const snapshot = await db.collection("tin-database").get();
        const entries = snapshot.docs.map(doc => doc.data());

        const values = [
            ["Registered Name", "TIN", "Address"],
            ...entries.map(entry => {
                const addressParts = [];

                if (entry.address1?.trim()) {
                    addressParts.push(entry.address1);
                }

                if (entry.address2?.trim()) {
                    addressParts.push(entry.address2);
                }

                return [
                    entry.registeredName,
                    entry.tin,
                    addressParts.join(",")
                ];
            })
        ];

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: sheetId,
            requestBody: {
                requests: [
                    {
                        addSheet: {
                            properties: { title: 'TIN Database' }
                        }
                    }
                ]
            }
        })

        await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: "TIN Database!A1:C",
            valueInputOption: "RAW",
            requestBody: { values }
        })

        const { status, ...body } = messages.entriesExported;
        return res.status(status).json(body);
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);

        if (error.includes("The caller does not have permission") || error.includes("403")) {
            const { status, ...body } = messages.sheetPermissionDenied;
            return res.status(status).json(body);
        }

        const { status, ...body } = messages.serverError(error);
        return res.status(status).json(body);
    }
}

