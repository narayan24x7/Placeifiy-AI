"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineWidgets } from "react-icons/md";
import { useUser } from "@clerk/nextjs"; //  Clerk hook

const HeroSection = () => {
  const { isSignedIn } = useUser(); //  check login state

  return (
    <>
      <div className="relative w-full h-[400px] md:h-[500px] flex justify-center items-center p-6 md:p-10">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/bgnew2.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
            zIndex: -1,
          }}
        ></div>

        {/* Content */}
        <div className="relative text-center z-10 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-extrabold text-blue-500">
            Master Every Interview with Placifiy-AI
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mt-2 text-pink-700">
            Transforming Career Growth with Artificial Intelligence
          </h3>
          <p className="text-lg md:text-xl mt-2 text-center">
            Unlock your full potential with AI-powered mock interviews and personalized insights. 
            Your success begins with Placifiy-AI
          </p>

          <div className="flex flex-col md:flex-row gap-2 justify-center mt-6 md:mt-10">
            {isSignedIn ? (
              //  Logged in → Dashboard + Know More
              <>
                <Link href={"/dashboard"}>
                  <Button className="flex justify-center gap-2 bg-slate-800 p-4 md:p-6 text-base md:text-md hover:bg-slate-700 rounded-lg">
                    Dashboard
                    <AiOutlineUser />
                  </Button>
                </Link>
                <Link href={"/about"}>
                  <Button className="flex justify-center gap-2 bg-blue-500 p-4 md:p-6 hover:bg-blue-800 text-base md:text-md rounded-lg">
                    Know More
                    <MdOutlineWidgets />
                  </Button>
                </Link>
              </>
            ) : (
              //  Logged out → Register Now + Know More
              <>
                <Link href={"/sign-up"}>
                  <Button className="flex justify-center gap-2 bg-slate-800 p-4 md:p-6 text-base md:text-md hover:bg-slate-700 rounded-lg">
                    Register Now
                    <AiOutlineUser />
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button className="flex justify-center gap-2 bg-blue-500 p-4 md:p-6 hover:bg-blue-800 text-base md:text-md rounded-lg">
                    Know More
                    <MdOutlineWidgets />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;