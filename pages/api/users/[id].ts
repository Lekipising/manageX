import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // this request is used to get a user by id
    const { id } = req.query;
    try {
        // get user
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        // return user
        res.status(200).json(user);
    }
    catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler