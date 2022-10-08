import axios from "axios";
import React, { useState } from "react";

export default function LoginForm({
  showModal,
  loginSuccess,
  close,
}: {
  showModal: (modal: string) => void;
  loginSuccess: () => void;
  close: () => void;
}) {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const submitForm = async () => {
    const userObj = {
      email,
      password,
    };
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", userObj);
      console.log(res);
      setLoading(false);
      resetForm();
      // save res.data to localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      loginSuccess();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => (e.target === e.currentTarget ? close() : null)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-main"
    >
      <div className="w-[40vw] h-[30vw] rounded-[15px] p-8 flex flex-col gap-4 bg-white justify-center items-center">
        <h1 className="text-[#212121] font-bold text-[30px]">Login</h1>
        <form className="flex flex-col gap-4 w-1/2 mt-6">
          <div className="w-full">
            <input
              type="text"
              name="email"
              id="email"
              className={`w-full ${
                !emailValid &&
                email.length > 0 &&
                "border-red-500 focus:border-red-500"
              }`}
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                validateEmail(e.target.value);
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="w-full">
            <input
              className="w-full"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              minLength={8}
            />
          </div>
          <button
            disabled={!email || !password || !emailValid || loading}
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="disabled:bg-[#828282] bg-[#FA7070] mt-8 text-white px-8 py-2 font-bold rounded-[5px] w-full"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <span
            className="text-xs underline cursor-pointer w-full text-center"
            onClick={() => showModal("login")}
          >
            Need an account? Create here
          </span>
        </form>
      </div>
    </div>
  );
}
