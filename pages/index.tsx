import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import SignUpForm from "../components/signup";
import ViewRequests from "../components/viewRequests";

export default function Home() {
  const isLoggedIn = false;
  return (
    <main className="flex">
      {isLoggedIn ? (
        <>
          <aside className="h-screen w-[20vw] flex justify-center items-center flex-col outline">
            <div className="relative w-[200px] h-[200px]">
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
            <h1>Name name </h1>
            <h2>Student</h2>

            <div>
              <h3>Requests</h3>
              <h3>Logout</h3>
            </div>
          </aside>
          <section>
            <ViewRequests />
          </section>
        </>
      ) : (
        <div>
          <SignUpForm />
        </div>
      )}
    </main>
  );
}
