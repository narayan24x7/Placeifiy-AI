"use client";
import { Button } from "@/components/ui/button";
import { FaUser, FaArrowUp, FaUserCircle } from "react-icons/fa";
import {
  SignInButton,
  UserButton,
  useUser
} from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdDashboardCustomize } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const { isSignedIn } = useUser();

  // Navigation handlers
  const NavigateToHome = () => router.push("/");
  const NavigateToDashboard = () => router.push("/dashboard");
  const NavigateToUpgrade = () => router.push("/dashboard/upgrade");
  const NavigateToAboutDeveloper = () => router.push("/aboutdeveloper");
  const NavigateToHowItWorks = () => router.push("/#howitworks");

  useEffect(() => {
    console.log("Current Path:", path);
  }, [path]);

  return (
    <>
      <div className="relative flex p-4 justify-between items-center shadow-sm text-gray-600">
        {/* Background image with opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 z-[-1]"
          style={{ backgroundImage: "url('/bgnew1.jpg')" }}
        ></div>

        {/* Left side - Logo and nav */}
        <div className="flex gap-10">
          <Image
            src="/logo4.png"
            width={35}
            height={35}
            alt="Placifiy-AI Logo"
          />
          <ul className="hidden md:flex gap-2 font-semibold">
            <li
              className={`flex gap-1 font-extrabold pr-4 pl-4 hover:bg-slate-800 hover:rounded-md hover:text-slate-200 transition-all cursor-pointer p-2 ${
                path === "/" && "text-cyan-700 font-bold"
              }`}
              onClick={NavigateToHome}
            >
              <span className="p-1">
                <AiFillHome className="w-4 h-4" />
              </span>
              Home
            </li>
            <li
              className={`flex gap-1 font-extrabold pr-4 pl-4 hover:bg-slate-800 hover:rounded-md hover:text-slate-200 transition-all cursor-pointer p-2 ${
                path === "/dashboard" && "text-cyan-700 font-bold"
              }`}
              onClick={NavigateToDashboard}
            >
              <span className="p-1">
                <MdDashboardCustomize className="w-4 h-4" />
              </span>
              Dashboard
            </li>
            <li
              className={`flex gap-1 font-extrabold pr-4 pl-4 hover:bg-slate-800 hover:rounded-md hover:text-slate-200 transition-all cursor-pointer p-2 ${
                path === "/dashboard/upgrade" && "text-cyan-700 font-bold"
              }`}
              onClick={NavigateToUpgrade}
            >
              <span className="p-1">
                <FaArrowUp className="w-4 h-4" />
              </span>
              Upgrade
            </li>
            <li
              className={`flex gap-1 font-extrabold pr-4 pl-4 hover:bg-slate-800 hover:rounded-md hover:text-slate-200 transition-all cursor-pointer p-2 ${
                path === "/#howitworks" && "text-cyan-700 font-bold"
              }`}
              onClick={NavigateToHowItWorks}
            >
              <span className="p-1">
                <BsFillQuestionSquareFill className="w-4 h-4" />
              </span>
              How it works
            </li>
        {/* Right side - Login or User */}
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Button className="flex gap-2 justify-center bg-transparent font-bold text-black hover:bg-slate-800 hover:text-slate-300 w-[100px]">
            <SignInButton>Login</SignInButton>
            <FaUser />
          </Button>
        )}
      </div>
    </>
  );
}

export default Header;
