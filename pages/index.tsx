import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginForm from "../components/login";
import CreateRequest from "../components/request";
import SignUpForm from "../components/signup";
import ViewRequests from "../components/viewRequests";
import ViewOneRequest from "../components/oneRequest";
import Spinner from "../components/spinners";
import CourseCard from "../components/courseCard";
import CourseView from "../components/courseView";
import CreateCourse from "../components/request";

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

  const [reloadRequests, setReloadRequests] = useState(false);

  const [allCourses, setAllCourses] = useState<any[]>();

  const fetchCourses = async () => {
    const res = await axios.get("/api/courses/get");
    if (user.role === "FACILITATOR") {
      setAllCourses(res.data.filter((course) => course.userId === user.id));
      return;
    }
    setAllCourses(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    if (isLoggedIn && !allCourses) {
      fetchCourses();
    }
    if (reloadRequests) {
      fetchCourses();
      setReloadRequests(false);
    }
  }, [reloadRequests, isLoggedIn]);

  const [showingCourse, setShowingCourse] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  if (isLoggedIn === null) return <Spinner />;

  return (
    <main className="flex">
      {isLoggedIn ? (
        <>
          <aside className="h-screen w-[20vw] flex justify-center items-center flex-col">
            <div className="relative w-[200px] h-[200px] mb-8">
              <Image
                src="/defaultpic.jpg"
                alt="avatar"
                fill
                className="rounded-full object-cover object-center"
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
          {!showingCourse && (
            <div>
              {user.role === "STUDENT" && (
                <section className="bg-[#2c3e50] h-max mt-16 pb-8 gap-6 mr-8 w-[80vw] rounded-lg flex flex-col px-8 py-4">
                  <h2 className="text-white font-bold text-xl">
                    Enrolled Courses
                  </h2>
                  {
                    <div className="flex gap-4 flex-wrap">
                      {allCourses &&
                        allCourses.map((crs) => (
                          <CourseCard
                            key={crs.id}
                            title={crs.title}
                            btnTextAndAction={{
                              text: "View",
                              action: () => setShowingCourse(crs),
                            }}
                          />
                        ))}
                    </div>
                  }
                </section>
              )}
              <section className="bg-[#2c3e50] h-max mt-8 relative pb-8 gap-6 mr-8 w-[80vw] rounded-lg flex flex-col px-8 py-4">
                <div className="flex justify-between">
                  <h2 className="text-white font-bold text-xl">
                    {user.role === "FACILITATOR"
                      ? "Browse assigned courses"
                      : "Browse available courses"}
                  </h2>
                  <div
                    onClick={() => setShowCreate(true)}
                    className="flex flex-col hover:bg-[#FA7070]/60 p-1 rounded-md items-center cursor-pointer absolute right-4 top-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#fff"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h3 className="text-white font-bold text-lg">Add Course</h3>
                  </div>
                </div>

                {allCourses && (
                  <div className="flex gap-4 flex-wrap">
                    {allCourses.map((crs) => (
                      <CourseCard
                        key={crs.id}
                        title={crs.title}
                        btnTextAndAction={{
                          text: user.role === "STUDENT" ? "Enroll" : "Manage",
                          action: () => setShowingCourse(crs),
                        }}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}
          {showingCourse && (
            <CourseView
              showUpdate={(crs) => setShowUpdate(crs)}
              user={user}
              course={showingCourse}
              close={() => setShowingCourse(null)}
              reloadRequests={() => setReloadRequests(true)}
            />
          )}
          {(showCreate || showUpdate) && (
            <CreateCourse
              isUpdate={showUpdate}
              close={() => {
                setShowCreate(false);
                showUpdate && setShowUpdate(false);
              }}
              reloadRequests={() => setReloadRequests(true)}
            />
          )}
        </>
      ) : (
        <div>
          {showModal === "create" ? (
            <SignUpForm showModal={() => setShowModal("login")} />
          ) : (
            <LoginForm
              showModal={() => setShowModal("create")}
              loginSuccess={() => setLoggedInSuccess(!loggedInSuccess)}
            />
          )}
        </div>
      )}
    </main>
  );
}
