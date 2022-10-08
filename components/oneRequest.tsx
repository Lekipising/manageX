import axios from "axios";
import React, { useEffect, useState } from "react";
import { processDate } from "../lib/helpers";
import Spinner from "./spinners";

export default function ViewOneRequest({
  request,
  close,
}: {
  request: Number;
  close: () => void;
}) {
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [requestComments, setRequestComments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [requestDetails, setRequestDetails] = useState<any>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const [fetchingUser, setFetchingUser] = useState(true);
  const fetchUser = async (setter: (arg0: any) => void) => {
    try {
      setFetchingUser(true);
      const res = await axios.get(`/api/users/${requestDetails.userId}`);
      setter(res.data);
      setFetchingUser(false);
    } catch (error) {
      setFetchingUser(false);
      console.log(error);
    }
  };

  const [fetchingRequest, setFetchingRequest] = useState(false);
  const fetchRequest = async () => {
    try {
      setFetchingRequest(true);
      const res = await axios.get(`/api/requests/${request}`);
      setRequestDetails(res.data);
      setFetchingRequest(false);
    } catch (error) {
      setFetchingRequest(false);
      console.log(error);
    }
  };

  const [fetchingComments, setFetchingComments] = useState(false);
  const fetchComments = async () => {
    try {
      setFetchingComments(true);
      const res = await axios.get(`/api/comments/get/?requestId=${request}`);
      setRequestComments(res.data);
      setFetchingComments(false);
    } catch (error) {
      setFetchingComments(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (requestDetails === null) {
      fetchRequest();
      fetchComments();
    }
  }, []);

  useEffect(() => {
    if (studentDetails === null && requestDetails?.userId) {
      fetchUser(setStudentDetails);
    }
  }, [requestDetails]);

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    const commentObj = {
      comment,
      requestId: requestDetails.id,
      userId: loggedInUser.id,
    };
    try {
      setLoading(true);
      const res = await axios.post("/api/comments/create", commentObj);
      console.log(res);
      setLoading(false);
      setComment("");
      setShowCommentInput(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => (e.target === e.currentTarget ? close() : null)}
    >
      <div className="w-[40vw] h-[30vw] rounded-[15px] p-8 flex flex-col gap-4 bg-white">
        {fetchingUser ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-[#212121] font-bold text-[30px]">
              Request details
            </h1>
            <h1 className="">{requestDetails?.title}</h1>
            <div>
              <h2>Student name: {studentDetails?.name}</h2>
              <h2>Submitted on: {processDate(requestDetails?.createdAt)} </h2>
            </div>
          </>
        )}
        {fetchingComments || fetchingUser ? (
          <h1 className="font-medium text-xl text-[#FA7070]">
            Getting comments...
          </h1>
        ) : (
          <div className="border-2 rounded-[5px] border-[#C6EBC5] p-4">
            <h2 className="text-[#000] text-[18px] font-medium">
              {requestComments.length === 0
                ? "No comments for this request yet"
                : "Comments"}
            </h2>
            <div className="mt-2 h-[15vh] overflow-y-auto">
              {requestComments.map((comment: any) => (
                <OneComment key={comment.id} comment={comment} />
              ))}
            </div>

            {!showCommentInput && loggedInUser?.role === "FACILITATOR" && (
              <button
                onClick={() => setShowCommentInput(true)}
                className="rounded mt-8 bg-[#FA7070] text-[14px] font-semibold px-4 text-white py-2"
              >
                Add new comment
              </button>
            )}
            {showCommentInput && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function OneComment({ comment }: { comment: any }) {
  return (
    <div className="bg-[#C6EBC5] mb-2 rounded-[5px] py-3 px-2">
      <p>{comment.content}</p>
      <div className="flex text-[10px] mt-1">
        <p>Commented on: {processDate(comment.createdAt)} </p>
      </div>
    </div>
  );
}
