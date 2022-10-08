import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // this request is user to create a new comment for a request: receives request id, comment, and user id
    const { requestId, comment: content, userId } = req.body;
    try {
        // create comment
        const comment = await prisma.comment.create({
            data: {
                content,
                requestId,
                userId
            }
        });
        // return comment
        res.status(200).json(comment);
    }
    catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler