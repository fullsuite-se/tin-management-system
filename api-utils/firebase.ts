import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

if (!projectId || !privateKey || !clientEmail) {
    throw new Error("Missing Firebase Admin credentials in environment variables");
}

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId,
            privateKey,
            clientEmail,
        }),
    });
}

export const db = getFirestore();