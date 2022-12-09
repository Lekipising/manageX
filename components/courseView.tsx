import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function CourseView({
  user,
  course,
  showUpdate,
  close,
  reloadRequests,
}) {
  const [laoding, setLoading] = useState(false);
  const deleteCourse = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/courses/delete", {
        id: course.moduleCode,
      });
      Swal.fire({
        title: "Success!",
        text: "Course deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      reloadRequests();
      close();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <section>
      <section className="bg-[#2c3e50] h-max mt-16 pb-8 gap-2 mr-8 relative w-[80vw] rounded-lg flex flex-col px-8 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#fff"
          onClick={() => close()}
          className="w-6 h-6 absolute right-2 top-2 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>

        <h2 className="text-white font-bold text-xl w-full text-center">
          Course details
        </h2>
        <div className="flex gap-16">
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex gap-2">
              <h3 className="text-white font-semibold text-lg">Course name:</h3>
              <h4 className="text-white text-lg">{course?.title}</h4>
            </div>
            <div className="flex gap-2">
              <h3 className="text-white font-semibold text-lg">
                Course credits:
              </h3>
              <h4 className="text-white text-lg">{course?.credits}</h4>
            </div>
            <div className="flex gap-2">
              <h3 className="text-white font-semibold text-lg">Course year:</h3>
              <h4 className="text-white text-lg">{course?.year}</h4>
            </div>
          </div>
          {user.role !== "STUDENT" && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-2">
                <h3 className="text-white font-semibold text-lg">
                  Enrolled students:
                </h3>
                <h4 className="text-white text-lg">10</h4>
              </div>
              {user.role === "ADMIN" && (
                <>
                  <div className="flex gap-2">
                    <button
                      onClick={() => showUpdate(course)}
                      className="bg-blue-700 text-white text-md font-bold px-6 py-1 rounded-md"
                    >
                      Update
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={laoding}
                      onClick={() => deleteCourse()}
                      className="bg-red-700 text-white text-md font-bold px-6 py-1 rounded-md"
                    >
                      {laoding ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
