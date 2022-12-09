import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // request for deleting a course
  // body: id

  try {
    const { id } = req.body;

    const course = await prisma.course.delete({
      where: {
        moduleCode: Number(id),
      },
    });

    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;