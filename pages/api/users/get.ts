import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // get all users from prisma
    const allUsers = await prisma.user.findMany();
    // return all users
    res.status(200).json(allUsers);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
