import axios from "axios";
import React, { useState, useEffect } from "react";
import { processDate } from "../lib/helpers";
import Spinner from "./spinners";

export default function ViewRequests({
  showCreate,
  showRequest,
  reloadRequests,
}: {
  showCreate: () => void;
  showRequest: (req: Number) => void;
  reloadRequests: boolean;
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(false);

  const getRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/requests/get");
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // first time
    if (requests.length === 0 && user) {
      getRequests();
    }
    // reload
    if (requests.length > 0) {
      getRequests();
    }
  }, [user, reloadRequests]);

  if (user === null) return <Spinner />;

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
      {loading && (
        <div className="w-[60vw] flex justify-center mt-8">
          <Spinner />
        </div>
      )}
      {!loading && (
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
            {requests.length === 0 && (
              <tr className="bg-white rounded-[5px]">
                <td
                  className="py-3 px-6 text-xs text-center font-bold"
                  colSpan={4}
                >
                  No requests found
                </td>
              </tr>
            )}
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
      )}
    </div>
  );
}
