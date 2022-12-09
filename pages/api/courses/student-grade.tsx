import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request for getting the grade of a student for a course
  // body: courseId, studentId
  const { courseId, studentId } = req.body;

  try {
    const grade = await prisma.grade.findMany({
      select: {
        user: true,
        course: true,
      },
    });

    console.log(grade);
    // filter the grade for the student and course
    const gradeForStudent = grade.filter(
      (g) =>
        g.user[0].id === Number(studentId) &&
        g.course[0].moduleCode === Number(courseId)
    );
    console.log(gradeForStudent);
    return res.status(200).json(grade);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
