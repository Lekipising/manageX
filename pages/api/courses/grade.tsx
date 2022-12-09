import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request used by user to grade a course for a student
  // body: courseId, studentId, grade

  // create a new grade record in grade table
  // update the grade field in the course table for the student

  try {
    const { courseId, studentId, grade } = req.body;

    const newGrade = await prisma.grade.create({
      data: {
        grade,
        status: grade >= 50 ? true : false,
        course: {
          connect: {
            moduleCode: Number(courseId),
          },
        },
        user: {
          connect: {
            id: Number(studentId),
          },
        },
      },
    });

    const course = await prisma.course.update({
      where: {
        moduleCode: Number(courseId),
      },
      data: {
        grades: {
          connect: {
            id: newGrade.id,
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