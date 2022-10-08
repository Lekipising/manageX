import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // get one request by id
    const { id } = req.query;
    try {
        // get request
        const request = await prisma.request.findUnique({
            where: {
                id: Number(id)
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