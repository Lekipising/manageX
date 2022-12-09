import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// bcrypt for password encryption
// @ts-ignore
import bcrypt from 'bcryptjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // request to receive data and create user
    const { name, email, password, role } = req.body;
    // defining password encryption and password hashing as two alternatives

    // 1. password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. password hashing
    // const hashedPassword = await bcrypt.hash(password, 10);


    try {
        // create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
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