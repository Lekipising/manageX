import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request for creating a course
  // body: title, year, credits, userId

  try {
    const { title, year, credits, userId } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        year,
        credits,
        userId: Number(userId),
        users: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });

    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;