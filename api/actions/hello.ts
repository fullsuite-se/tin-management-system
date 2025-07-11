import type {VercelRequest, VercelResponse} from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const name = req.query.name ?? 'World';

    res.status(200).send(`Hello ${name} from serverless!`);
}