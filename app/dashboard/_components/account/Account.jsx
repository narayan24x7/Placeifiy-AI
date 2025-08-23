"use client";

import { UserProfile } from "@clerk/nextjs";

const Account = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Account Settings
        </h1>
        {/* Clerk handles profile, email, password, sessions, etc */}
        <UserProfile
          appearance={{
            elements: {
              card: "shadow-none border-none",
              headerTitle: "text-xl font-semibold text-gray-800",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Account;
