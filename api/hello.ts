import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const name = req.query.name ?? 'World';
    res.writeHead(200);
    res.write(`Hello ${name}!`);
    res.end();
}