import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const eightCharactersRegex = /.{8,}/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /[0-9]/;
const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

import Swal from "sweetalert2";

export default function SignUpForm({
  showModal,
}: {
  showModal: (modal: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("STUDENT");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // password validation
  const [hasEightCharacters, setHasEightCharacters] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);

  const validatePassword = (pass: string) => {
    setHasEightCharacters(eightCharactersRegex.test(pass));
    setHasUppercase(uppercaseRegex.test(pass));
    setHasLowercase(lowercaseRegex.test(pass));
    setHasNumber(numberRegex.test(pass));
    setHasSpecialCharacter(specialCharacterRegex.test(pass));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(email));
  };

  const [buttonEnabled, setButtonEnabled] = useState(false);

  const validateForm = () => {
    if (
      name.length > 0 &&
      validEmail &&
      password.length > 0 &&
      password === confirmPassword &&
      hasEightCharacters &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialCharacter
    ) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [
    name,
    email,
    password,
    confirmPassword,
    hasEightCharacters,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialCharacter,
  ]);

  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setHasEightCharacters(false);
    setHasUppercase(false);
    setHasLowercase(false);
    setHasNumber(false);
    setHasSpecialCharacter(false);
    setButtonEnabled(false);
  };

  const submitForm = async () => {
    const userObj = {
      name,
      email,
      password,
      role: activeTab,
    };
    try {
      setLoading(true);
      const res = await axios.post("/api/users/create", userObj);
      Swal.fire({
        title: "Success!",
        text: "Your account has been created.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(res);
      resetForm();
      setLoading(false);
      showModal("login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-main">
      <div className="w-max min-w-[700px] h-max rounded-[15px] p-8 flex flex-col gap-4 bg-white">
        <h1 className="text-[#212121] font-bold text-[30px]">
          Create an account
        </h1>
        <div className="flex gap-2 bg-main p-4 rounded-[5px] w-[330px]">
          <span
            className={`text-white text-sm font-semibold rounded-[5px] px-3 py-1 cursor-pointer transition-all ease-in duration-300 ${
              activeTab === "STUDENT" ? "bg-white text-black" : ""
            }`}
            onClick={() => setActiveTab("STUDENT")}
          >
            Student
          </span>
          <span
            className={`text-white text-sm font-semibold rounded-[5px] px-3 py-1 cursor-pointer transition-all ease-in duration-300 ${
              activeTab === "FACILITATOR" ? "bg-white text-black" : ""
            }`}
            onClick={() => setActiveTab("FACILITATOR")}
          >
            Facilitator
          </span>
          <span
            className={`text-white text-sm font-semibold rounded-[5px] px-3 py-1 cursor-pointer transition-all ease-in duration-300 ${
              activeTab === "ADMIN" ? "bg-white text-black" : ""
            }`}
            onClick={() => setActiveTab("ADMIN")}
          >
            Lead
          </span>
        </div>
        <div className="flex w-full relative">
          <form className="flex flex-col gap-4 w-1/2 mt-8">
            <div className="w-full">
              <input
                type="text"
                name="name"
                id="name"
                className="w-full"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter email"
                className={`w-full ${
                  !validEmail &&
                  email.length > 0 &&
                  "border-red-500 focus:border-red-500"
                }`}
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
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="w-full"
                value={password}
                onChange={(e) => {
                  validatePassword(e.target.value);
                  setPassword(e.target.value);
                }}
                required
                onFocus={() => setShowPasswordRequirements(true)}
                onBlur={() => setShowPasswordRequirements(false)}
                minLength={8}
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                name="password-confirm"
                id="password-confirm"
                placeholder="Enter password again"
                className={`w-full ${
                  password !== confirmPassword &&
                  confirmPassword.length > 0 &&
                  "border-red-500 focus:border-red-500"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <button
              disabled={!buttonEnabled || loading}
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
              className="disabled:bg-[#828282] bg-[#FA7070] mt-8 text-white px-8 py-2 font-bold rounded-[5px] w-full"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
            <span
              className="text-xs underline cursor-pointer w-full text-center"
              onClick={() => showModal("create")}
            >
              Have an account? Login here
            </span>
          </form>
          <div className="flex justify-center items-center w-1/2 flex-col">
            {showPasswordRequirements ? (
              <div>
                <h3 className="mb-2 font-medium">Password requirements:</h3>
                <div className="flex gap-4 mb-1">
                  <Image
                    src={hasLowercase ? "/correct.svg" : "/wrong.svg"}
                    height="20"
                    width="20"
                    objectFit="contain"
                    alt="Valid"
                  />
                  <p className="text-xs">Contain atleast 1 lowercase</p>
                </div>
                <div className="flex gap-4 mb-1">
                  <Image
                    src={hasUppercase ? "/correct.svg" : "/wrong.svg"}
                    height="20"
                    width="20"
                    alt="Valid"
                  />
                  <p className="text-xs">Contain atleast 1 uppercase</p>
                </div>
                <div className="flex gap-4 mb-1">
                  <Image
                    src={hasSpecialCharacter ? "/correct.svg" : "/wrong.svg"}
                    height="20"
                    width="20"
                    alt="Valid"
                  />
                  <p className="text-xs">Contain atleast 1 special character</p>
                </div>
                <div className="flex gap-4 mb-1">
                  <Image
                    src={hasNumber ? "/correct.svg" : "/wrong.svg"}
                    height="20"
                    width="20"
                    alt="Valid"
                  />
                  <p className="text-xs">Contain atleast 1 number</p>
                </div>
                <div className="flex gap-4 mb-1">
                  <Image
                    src={hasEightCharacters ? "/correct.svg" : "/wrong.svg"}
                    height="20"
                    width="20"
                    alt="Valid"
                  />
                  <p className="text-xs">Atleast 8 characters</p>
                </div>
              </div>
            ) : (
              <div className="absolute right-16 flex flex-col items-center top-32">
                <h1 className="text-[25px] font-semibold text-black">
                  Welcome
                </h1>
                <p className="text-xs">Create an account to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
