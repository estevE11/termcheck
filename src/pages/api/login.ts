
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/utils/dbconnect';
import { compare, hashPassword } from '@/utils/passwordutils';
import { sign } from 'jsonwebtoken';

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

    const rs = await client.execute(`
        select * from users where username=${data.username}
    `);

    const hashedPass = rs.rows[0].password as string;

    const correct = await compare(data.password, hashedPass);

    if (!correct) {
        res.status(200).json({ "err":  "auth fail"})
        return;
    }

    var privateKey: string = process.env.JWT_SECRET as string;

    const tokenData = {
        username: data.username,
        password: data.password,
        date: Date.now()
    }
    var token = sign(tokenData, privateKey, { algorithm: 'RS256' });
    
    await client.execute(`
        insert into user_tokens (
            id_user,
            token
        ) values (
            ${rs.rows[0].id},
            ${token}
        )
    `);

    res.status(200).json({ token: token });
}