import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request for updating a course
  // body: id, title, year, credits, userId

  try {
    const { id, title, year, credits, userId } = req.body;

    const course = await prisma.course.update({
      where: {
        moduleCode: Number(id),
      },
      data: {
        title,
        year,
        credits,
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