import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginForm from "../components/login";
import CreateRequest from "../components/request";
import SignUpForm from "../components/signup";
import ViewRequests from "../components/viewRequests";
import ViewOneRequest from "../components/oneRequest";
import Spinner from "../components/spinners";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [loggedInSuccess, setLoggedInSuccess] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [loggedInSuccess]);

  const [showModal, setShowModal] = useState("create");

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const [showingRequest, setShowingRequest] = useState(null);

  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);

  const [reloadRequests, setReloadRequests] = useState(false);

  if (isLoggedIn === null) return <Spinner />;

  return (
    <main className="flex">
      {isLoggedIn ? (
        <>
          <aside className="h-screen w-[20vw] flex justify-center items-center flex-col">
            <div className="relative w-[200px] h-[200px] mb-8">
              <Image
                src="/defaultpic.jpg"
                width="200"
                height="200"
                alt="avatar"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-full"
              />
            </div>
            <h1 className="font-bold text-[24px] text-white">{user.name}</h1>
            <h2 className="text-[#828282] font-medium text-[16px]">
              {user.role}
            </h2>
            <button
              onClick={() => logout()}
              className="mt-8 text-[#C6EBC5] outline rounded-[5px] px-4"
            >
              Sign out
            </button>
          </aside>
          <section className="w-[80vw] flex flex-col items-center px-32 py-8">
            <ViewRequests
              showCreate={() => setShowCreateRequestModal(true)}
              showRequest={(req) => setShowingRequest(req)}
              reloadRequests={reloadRequests}
            />
            {showCreateRequestModal && (
              <CreateRequest
                reloadRequests={() => setReloadRequests(!reloadRequests)}
                close={() => setShowCreateRequestModal(false)}
              />
            )}
            {showingRequest && (
              <ViewOneRequest
                close={() => setShowingRequest(false)}
                request={showingRequest}
              />
            )}
          </section>
        </>
      ) : (
        <div>
          {showModal === "create" ? (
            <SignUpForm
              showModal={() => setShowModal("login")}
              close={() => setShowModal("")}
            />
          ) : (
            <LoginForm
              showModal={() => setShowModal("create")}
              loginSuccess={() => setLoggedInSuccess(!loggedInSuccess)}
              close={() => setShowModal("")}
            />
          )}
        </div>
      )}
    </main>
  );
}
