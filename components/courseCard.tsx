import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";

export default function CourseCard({
  title,
  courseId,
  btnTextAndAction,
  user,
}: {
  title: string;
  btnTextAndAction: { text: string; action: () => void };
  user: any;
  courseId: number;
}) {
  const [loading, setLoading] = useState(false);

  const enrollCourse = async (courseId) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/courses/enroll", {
        courseId,
        studentId: user.id,
      });
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(courseId);

  return (
    <div className="w-[200px] rounded-lg pb-32 h-[230px] flex relative flex-col gap-4 bg-white p-8 pt-2 px-0">
      <div className="relative w-auto mx-2 min-h-[100px] rounded-md">
        <Image
          src={"https://random.imagecdn.app/500/150"}
          fill
          className="object-cover object-center rounded-md"
          alt={title}
        />
      </div>
      <h1 className="text-black mx-2 font-semibold text-base leading-[100%]">
        {title}
      </h1>

      <button
        onClick={() => {
          btnTextAndAction?.text === "Enroll"
            ? enrollCourse(courseId)
            : btnTextAndAction.action();
        }}
        className="bg-[#FA7070] absolute bottom-2 inset-x-0 mx-auto w-max rounded-md px-8 py-2 text-sm text-white font-semibold"
      >
        {btnTextAndAction?.text || "View"}
      </button>
    </div>
  );
}
