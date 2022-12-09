import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request for fetching the courses of a user
  // body: userId
  try {
    const { userId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        courses: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
