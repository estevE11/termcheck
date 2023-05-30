// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/utils/dbconnect';
import { isReturnStatement } from 'typescript';

const methodHandlerMap: { [id: string]: (req: NextApiRequest, res: NextApiResponse) => void } = {
}
methodHandlerMap["get"] = get;
methodHandlerMap["post"] = post;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Set the CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const method: string = req.method as string;

    methodHandlerMap[method.toLowerCase()](req, res);
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    const client = connect();

    const rs: any = await client.execute(`
        SELECT *
        FROM todo
        WHERE datetime(date) >= datetime('now', '-4 days');
    `);

    res.status(200).json({ rows: rs.rows })
}

async function post(req: NextApiRequest, res: NextApiResponse) {
    const client = connect();

    const rs: any = await client.execute(`
        INSERT INTO todo (
            name,
            date
        ) values (
            '${req.body.name}',
            '${req.body.date}'
        )
    `);
    
    res.status(200).json({});
    return;
}