import React from "react";

export default function LoginForm() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[50vw] h-[50vw]">
        <h1>Login</h1>
        <form>
          <div>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
