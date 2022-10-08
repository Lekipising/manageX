import React from "react";

export default function CommentModal() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[50vw] h-[50vw]">
        <h1>Add comment</h1>
        <form>
          <textarea name="comment" id="comment" />
          <button>Add comment</button>
        </form>
      </div>
    </div>
  );
}
