import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { role } = req.query;
    if (role) {
      const users = await prisma.user.findMany({
        where: {
          role: role as string
        }
      });
      res.status(200).json(users);
    } else {
      // get all users from prisma
      const allUsers = await prisma.user.findMany();
      // return all users
      res.status(200).json(allUsers);
    }

  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
