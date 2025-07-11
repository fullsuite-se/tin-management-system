import { db } from "../../shared/firebase.js";
import type { TinData } from "../../shared/models/tinData.ts";
import type {VercelRequest, VercelResponse} from "@vercel/node";

// const handler = async (req: VercelRequest, res: VercelResponse) => {
//     try {
//         if (req.method === 'GET') {
//             return res.status(200).json({ message: 'TIN serverless function is running ✅' });
//         }
//
//         if (req.method !== 'POST') {
//             return res.status(405).json({ message: 'Method not allowed' });
//         }
//
//         const data: TinData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
//
//         if (!data) {
//             return res.status(400).json({ message: 'Missing request body' });
//         }
//
//         const success = await addEntry(data);
//
//         if (!success) {
//             return res.status(400).json({ message: 'Invalid or incomplete data' });
//         }
//
//         return res.status(200).json({ message: 'Entry added successfully' });
//     } catch (e) {
//         console.error('Caught error:', e);
//         return res.status(500).json({ message: 'Internal server error', error: e.message });
//     }
// };
//
// export default handler;
//
// async function addEntry(data: TinData): Promise<boolean> {
//     const {
//         tin,
//         registeredName,
//         address1,
//         address2,
//         isIndividual,
//         isForeign,
//         createdBy,
//         createdAt,
//     } = data;
//
//     if ([tin, registeredName, address1, address2, createdBy, createdAt].some(field => field == null)) {
//         return false;
//     }
//
//     if (typeof isIndividual !== 'boolean' || typeof isForeign !== 'boolean') {
//         return false;
//     }
//
//     try {
//         await db.collection('tin-database').add(data);
//         return true;
//     } catch (error) {
//         console.error('Firestore write failed:', error);
//         return false;
//     }
// }


// import { db } from '../utils/firebase.ts';
// import type { TinData } from '../../shared/models/tinData.ts';
//


const handler = async (req: VercelRequest, res: VercelResponse) => {
    try {
        if (req.method === 'GET') {
            return res.status(200).json({ message: 'TIN serverless function is running ✅' });
        }

        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method not allowed' });
        }

        const data: TinData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        if (!data) {
            return res.status(400).json({ message: 'Missing request body' });
        }

        const success = await addEntry(data);

        if (!success) {
            return res.status(400).json({ message: 'Invalid or incomplete data' });
        }

        return res.status(200).json({ message: 'Entry added successfully' });
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return res.status(500).json({ message: 'Internal server error', error: e.message});
        } else {
            console.error("Caught error", e);
            return res.status(500).json({ message: 'Internal server error', error: e});
        }
    }
};

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

    if ([tin, registeredName, address1, address2, createdBy, createdAt].some((field) => field == null)) {
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

export default handler;