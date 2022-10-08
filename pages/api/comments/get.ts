import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // this request is used to get all comments or comments belonging to a request if we have parameter: requestId
    const { requestId } = req.query;
    try {
        // get comments
        if (requestId) {
            const comments = await prisma.comment.findMany({
                where: {
                    requestId: Number(requestId)
                }
            });
            // return comments
            res.status(200).json(comments);
        }
        else {
            const comments = await prisma.comment.findMany();
            // return comments
            res.status(200).json(comments);
        }

    }
    catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler