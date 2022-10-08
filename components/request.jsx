import React from "react";

export default function CreateRequest() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[50vw] h-[50vw]">
        <h1>Create a request</h1>
        <form>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
            />
          </div>
          <div>
            <textarea name="content" id="content" className="Request details" />
          </div>

          <button>Create request</button>
        </form>
      </div>
    </div>
  );
}
