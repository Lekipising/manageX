import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request for fetching the users of a course
  // body: courseId
  try {
    const { courseId } = req.body;

    const course = await prisma.course.findUnique({
      where: {
        moduleCode: Number(courseId),
      },
      select: {
        users: true,
      },
    });

    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
