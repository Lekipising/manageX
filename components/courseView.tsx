import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { processDate } from "../lib/helpers";

export default function CourseView({
  user,
  course,
  showUpdate,
  close,
  reloadRequests,
}) {
  const [laoding, setLoading] = useState(false);

  const [students, setStudents] = useState<any[]>([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.post("/api/courses/users", {
        courseId: course.moduleCode,
      });
      setStudents(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, []);

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

  const [showAddGrade, setShowAddGrade] = useState(false);

  const [grade, setGrade] = useState("");

  const createGrade = async (e, studentId) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/courses/grade", {
        courseId: course.moduleCode,
        studentId,
        grade: grade,
      });
      Swal.fire({
        title: "Success!",
        text: "Grade created successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      setShowAddGrade(false);
      fetchStudents();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchGrade = async (studentId) => {
    try {
      const res = await axios.post("/api/courses/student-grade", {
        courseId: course.moduleCode,
        studentId,
      });
      console.log(res.data);
    } catch (error) {
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
                <h4 className="text-white text-lg">{students.length}</h4>
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
          {user.role === "STUDENT" && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-2">
                <h3 className="text-white font-semibold text-lg">Grade:</h3>
                <h4 className="text-white text-lg">{students.length}</h4>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#2c3e50] h-max mt-16 pb-8 gap-2 mr-8 relative w-[80vw] rounded-lg flex flex-col px-8 py-4">
        <h2 className="text-white font-bold text-xl w-full text-center">
          Students enrolled
        </h2>
        <table className="w-full rounded-[30px]">
          <thead className="">
            <tr className="rounded-[5px] bg-[#F6F4F9] text-left text-xs">
              <th className="py-3 px-6 font-semibold">name</th>
              <th className="hidden py-3 font-semibold md:table-cell">email</th>
              <th className="py-3 pr-12 text-right font-semibold">
                Add/Edit Grade
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 && (
              <tr className="bg-white rounded-[5px]">
                <td
                  className="py-3 px-6 text-xs text-center font-bold"
                  colSpan={3}
                >
                  No students enrolled
                </td>
              </tr>
            )}
            {students.map((req) => (
              <tr key={req.id} className="bg-[#C6EBC5]">
                <td className="py-3 pl-6 text-xs">{req.name}</td>
                <td className="hidden text-xs md:table-cell">{req.email}</td>
                <td className="pr-8 text-right">
                  <button
                    className="bg-[#F6F4F9] text-xs px-6 py-1 rounded-lg"
                    onClick={() => {
                      fetchGrade(req.id);
                      setShowAddGrade(req.id);
                    }}
                  >
                    Grade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showAddGrade && (
          <div
            onClick={(e) =>
              e.target === e.currentTarget ? setShowAddGrade(false) : null
            }
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="bg-white p-8 rounded-md">
              <form className="flex gap-6">
                <input
                  type="text"
                  name="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  id="grade"
                  placeholder="Enter grade"
                />
                <button
                  onClick={(e) => createGrade(e, showAddGrade)}
                  className="px-6 py-1 rounded-lg border-black border-[1px]"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
