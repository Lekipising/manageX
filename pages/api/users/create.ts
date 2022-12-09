import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// bcrypt for password encryption
// @ts-ignore
import bcrypt from 'bcrypt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // request to receive data and create user
    const { name, email, password, role } = req.body;
    // defining password encryption and password hashing as two alternatives

    // 1. password encryption
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // the weakness of password encryption is that the same password will always be encrypted to the same value

    // 2. password hashing
    const saltRounds = 2;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // we use salting and rounds to make the encryption more secure and to make it harder to decrypt the password

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