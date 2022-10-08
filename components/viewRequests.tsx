import React from "react";

export default function ViewRequests() {
  const reqArr = [];
  return (
    <div>
      <h1>Requests submitted</h1>
      <button>Create new</button>
      <table>
        <thead className="rounded">
          <tr className="rounded bg-[#F6F4F9] text-left text-xs">
            <th className="py-3 px-6 font-semibold">Title</th>
            <th className="hidden py-3 font-semibold md:table-cell">
              Submitted by
            </th>
            <th className="hidden py-3 font-semibold md:table-cell">
              Submitted on
            </th>
            <th className="py-3 pr-12 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {reqArr.map((req) => (
            <tr key={req.id}>
              <td className="py-3 pl-6 text-xs">
                <small className="mb-1 block">Contact</small>
                <strong>{req.title}</strong>
              </td>
              <td className="hidden text-xs md:table-cell">{req.title}</td>
              <td className="hidden text-xs md:table-cell">{req.title}</td>
              <td className="pr-8 text-right">
                <button className="rounded bg-[#666666] py-1 px-4 text-xs font-medium text-white">
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
