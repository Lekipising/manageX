import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // request to receive login data
    const { email, password } = req.body;
    try {
        // find user
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        // check if user exists
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // check if password matches
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // return user
        res.status(200).json(user);
    }
    catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler