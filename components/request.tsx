import axios from "axios";
import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

export default function CreateCourse({
  close,
  reloadRequests,
  isUpdate,
}: {
  close: () => void;
  reloadRequests: () => void;
  isUpdate?: any;
}) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [credits, setCredits] = useState("");

  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const resetForm = () => {
    setTitle("");
  };
  const [loading, setLoading] = useState(false);

  const [selectedFacilitator, setSelectedFacilitator] = useState("");

  const updateCourse = async ({ obj }) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/courses/update", obj);
      Swal.fire({
        title: "Success!",
        text: "Course updated successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(res);
      setLoading(false);
      resetForm();
      reloadRequests();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    const requestObj = {
      title,
      credits: parseInt(credits),
      year: parseInt(year),
      userId: selectedFacilitator,
      id: isUpdate ? isUpdate.moduleCode : null,
    };
    if (isUpdate) {
      updateCourse({ obj: requestObj });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/courses/create", requestObj);
      Swal.fire({
        title: "Success!",
        text: "Course created successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(res);
      setLoading(false);
      resetForm();
      reloadRequests();
      close();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const [facilitators, setFacilitators] = useState<any[]>([]);

  const fetchFacilitators = async () => {
    try {
      const res = await axios.get("/api/users/get?role=FACILITATOR");
      setFacilitators(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (facilitators.length === 0) {
      fetchFacilitators();
    }
  }, []);

  useEffect(() => {
    if (isUpdate) {
      setTitle(isUpdate.title);
      setYear(isUpdate.year);
      setCredits(isUpdate.credits);
      setSelectedFacilitator(isUpdate.userId);
    }
  }, [isUpdate]);

  return (
    <div
      onClick={(e) => (e.target === e.currentTarget ? close() : null)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="w-[40vw] h-[30vw] rounded-[15px] p-8 flex flex-col gap-4 bg-white justify-center items-center">
        <h1 className="text-[#212121] font-bold text-[30px]">
          {isUpdate ? "Edit course" : "Create a course"}
        </h1>
        <form className="flex flex-col gap-4 w-1/2 mt-6">
          <div className="w-full">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter name"
              className="w-full"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              name="year"
              id="year"
              placeholder="Enter year"
              className="w-full"
              value={year}
              required
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              name="credits"
              id="credits"
              placeholder="Enter credits"
              className="w-full"
              value={credits}
              required
              onChange={(e) => setCredits(e.target.value)}
            />
          </div>
          <div>
            <select
              required
              value={selectedFacilitator}
              onChange={(e) => setSelectedFacilitator(e.target.value)}
              className="h-full w-full py-1 px-4 rounded-md border border-slate-300 text-sm"
              data-testid="select-payer"
            >
              <option value="">Choose facilitator</option>
              {facilitators?.map((facilitator) => (
                <option key={facilitator?.id} value={facilitator?.id}>
                  {facilitator?.name}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={
              !title ||
              !credits ||
              !year ||
              loading ||
              selectedFacilitator === ""
            }
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="disabled:bg-[#828282] bg-[#FA7070] mt-8 text-white px-8 py-2 font-bold rounded-[5px] w-full"
          >
            {loading
              ? "Creating..."
              : `${isUpdate ? "Update course" : "Create course"}`}
          </button>
        </form>
      </div>
    </div>
  );
}
