import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // this request is used to get all requests or requests belonging to a user if we have parameter: userId
    const { userId } = req.query;
    try {
        // get requests
        if (userId) {
            const requests = await prisma.request.findMany({
                where: {
                    userId: Number(userId)
                }
            });
            // return requests
            res.status(200).json(requests);
        }
        else {
            const requests = await prisma.request.findMany();
            // return requests
            res.status(200).json(requests);
        }

    }
    catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler