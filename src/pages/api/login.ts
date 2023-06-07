
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/utils/dbconnect';

type reqBody = {
    username: string,
    password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Set the CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const method: string = req.method as string;

    if (method != 'POST') res.status(400);

    const data = req.body as reqBody;

    const client = connect();
}