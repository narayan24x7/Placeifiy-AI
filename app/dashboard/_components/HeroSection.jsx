"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function HeroSection() {
  const { isSignedIn } = useUser();

  return (
    <section className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
      <div className="container mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to Placeifiy AI
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Practice mock interviews with AI-powered questions and instant feedback.
        </p>

        <div className="flex justify-center gap-4">
          {/* Always show dashboard link */}
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white text-indigo-600 rounded-lg shadow hover:bg-gray-100 font-semibold transition"
          >
            Go to Dashboard
          </Link>

          {/* Show "Register" button ONLY if not signed in */}
          {!isSignedIn && (
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-indigo-700 text-white rounded-lg shadow hover:bg-indigo-800 font-semibold transition"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}