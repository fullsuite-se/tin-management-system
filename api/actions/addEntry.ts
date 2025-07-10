import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../utils/firebase';
import { TinData } from '../../shared/models/tinData';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // ✅ Respond to GET request to verify endpoint is working
    if (req.method === 'GET') {
        return res.status(200).json({ message: 'TIN serverless function is running ✅' });
    }

    // ❌ Block unsupported methods
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const body = req.body;

    if (body) {
        try {
            const success = await addEntry(body);

            if (!success) {
                return res.status(400).json({ message: 'Invalid or incomplete data' });
            }

            return res.status(200).json({ message: 'Entry added successfully' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    return res.status(400).json({ message: 'Missing request body' });
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

    if ([tin, registeredName, address1, address2, createdBy, createdAt].some(field => field == null)) {
        return false;
    }

    if (typeof isIndividual !== 'boolean' || typeof isForeign !== 'boolean') {
        return false;
    }

    try {
        await db.collection('tin-database').add(data);
        return true;
    } catch (error) {
        console.error('Firestore write failed:', error);
        return false;
    }
}
