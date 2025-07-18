import { google } from "googleapis";
import { db } from "../api-utils/firebase.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
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

        const { sheetUrl } = req.body;
        const sheetId = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];

        if (!sheetId) {
            return res.status(400).json({ message: "Invalid sheet URL" });
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

        return res.status(200).json({ message: "Entries exported successfully" });
    } catch (e) {
        const error = e instanceof Error ? e.message : String(e);

        if (error.includes("The caller does not have permission") || error.includes("403")) {
            return res.status(403).json({ message: "Oops! Please share the sheet with our expert bot:\n" +
                    "fs-tin-export-bot@tin-management-system.iam.gserviceaccount.com"})
        }

        return res.status(500).json({ message: "Internal server error", error: error });
    }
}

