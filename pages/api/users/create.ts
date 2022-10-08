import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // request to receive data and create user
    const { name, email, password, role } = req.body;
    try {
        // create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role
            }
        });
        // return user
        res.status(200).json(user);
    }
    catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
};

export default handler