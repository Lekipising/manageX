import React from "react";

export default function ViewOneRequest() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[50vw] h-[50vw]">
        <h1>Request title</h1>
        <div>
          <h2>Student name: </h2>
          <h2>Submitted on: </h2>
        </div>
        <div>
          <h2>Comments</h2>
          <OneComment />
          <button>Add new comment</button>
        </div>
      </div>
    </div>
  );
}

function OneComment() {
  return (
    <div>
      <p>Content here</p>
      <p>Commented by: </p>
      <p>Commented on: </p>
    </div>
  );
}
