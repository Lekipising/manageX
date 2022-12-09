import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request to enrol a user(student) in a course
  // body: courseId, studentId
  try {
    const { courseId, studentId } = req.body;

    const course = await prisma.course.update({
      where: {
        moduleCode: Number(courseId),
      },
      data: {
        users: {
          connect: {
            id: Number(studentId),
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
