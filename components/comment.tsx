import axios from "axios";
import React, { useState } from "react";

export default function CommentModal() {
  const [comment, setComment] = useState("");
  const requestId = 4;
  const userId = 54;

  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    const commentObj = {
      comment,
      requestId,
      userId,
    };
    try {
      setLoading(true);
      const res = await axios.post("/api/comments/create", commentObj);
      console.log(res);
      setLoading(false);
      setComment("");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[40vw] h-[30vw] rounded-[15px] p-8 flex flex-col gap-4 bg-white justify-center items-center">
        <h1 className="text-[#212121] font-bold text-[30px]">Add comment</h1>
        <form className="flex flex-col gap-4 w-1/2 mt-6">
          <textarea
            name="comment"
            id="comment"
            className="w-full h-[100px]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Write comment"
          />
          <button
            disabled={!comment || loading}
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="disabled:bg-[#828282] bg-[#FA7070] mt-8 text-white px-8 py-2 font-bold rounded-[5px] w-full"
          >
            {loading ? "Creating..." : "Add comment"}
          </button>
        </form>
      </div>
    </div>
  );
}
