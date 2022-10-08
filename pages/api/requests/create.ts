import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // this request is user to create a new request: receives title, description, and user id
    const { title, description, userId } = req.body;
    try {
        // create request
        const request = await prisma.request.create({
            data: {
                title,
                content: description,
                userId
            }
        });
        // return request
        res.status(200).json(request);
    }
    catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler