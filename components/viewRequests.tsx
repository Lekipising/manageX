import axios from "axios";
import React, { useState, useEffect } from "react";
import { processDate } from "../lib/helpers";

export default function ViewRequests({
  showCreate,
  showRequest,
}: {
  showCreate: () => void;
  showRequest: (req: Number) => void;
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    try {
      const res = await axios.get("/api/requests/get");
      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (requests.length === 0 && user) {
      getRequests();
    }
  }, [user]);

  if (user === null) return null;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-[32px] text-white ">Requests submitted</h1>
      {user.role === "STUDENT" && (
        <button
          onClick={() => showCreate()}
          className="disabled:bg-[#828282] w-[250px] bg-[#FA7070] mt-8 text-white px-8 py-2 font-bold rounded-[5px]"
        >
          Create new
        </button>
      )}
      <table className="w-[60vw]">
        <thead className="">
          <tr className="rounded-[5px] bg-[#F6F4F9] text-left text-xs">
            <th className="py-3 px-6 font-semibold">ID</th>
            <th className="hidden py-3 font-semibold md:table-cell">Title</th>
            <th className="hidden py-3 font-semibold md:table-cell">
              Submitted on
            </th>
            <th className="py-3 pr-12 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="bg-[#C6EBC5]">
              <td className="py-3 pl-6 text-xs">{req.id}</td>
              <td className="hidden text-xs md:table-cell">{req.title}</td>
              <td className="hidden text-xs md:table-cell">
                {processDate(req.createdAt)}
              </td>
              <td className="pr-8 text-right">
                <button
                  onClick={() => showRequest(req.id)}
                  className="rounded bg-[#FA7070] py-1 px-4 text-xs font-medium text-white"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
