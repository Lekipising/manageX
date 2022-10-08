import axios from "axios";
import React, { useState, useEffect } from "react";

export default function CreateRequest({
  close,
  reloadRequests,
}: {
  close: () => void;
  reloadRequests: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    const requestObj = {
      title,
      description,
      userId: loggedInUser.id,
    };
    try {
      setLoading(true);
      const res = await axios.post("/api/requests/create", requestObj);
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

  return (
    <div
      onClick={(e) => (e.target === e.currentTarget ? close() : null)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="w-[40vw] h-[30vw] rounded-[15px] p-8 flex flex-col gap-4 bg-white justify-center items-center">
        <h1 className="text-[#212121] font-bold text-[30px]">
          Create a request
        </h1>
        <form className="flex flex-col gap-4 w-1/2 mt-6">
          <div className="w-full">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              className="w-full"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full">
            <textarea
              name="content"
              id="content"
              className="w-full h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter request details"
            />
          </div>

          <button
            disabled={!title || !description || loading}
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="disabled:bg-[#828282] bg-[#FA7070] mt-8 text-white px-8 py-2 font-bold rounded-[5px] w-full"
          >
            {loading ? "Creating..." : "Create request"}
          </button>
        </form>
      </div>
    </div>
  );
}
