import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request for getting all courses
  // optional query params: facilitator, student

  const { userId } = req.query;

  try {
    if (userId) {
      const courses = await prisma.course.findMany({
        // where userId
        where: {
          users: {
            some: {
              id: Number(userId),
            },
          },
        },
      });
      res.status(200).json(courses);
    } else {
      const courses = await prisma.course.findMany();
      res.status(200).json(courses);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
