"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ADeleteAccount = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const authSecret = process.env.NEXT_PUBLIC_AUTH_HEADERS_SECRET || "";
  const params = useSearchParams();
  const id = params.get("id");

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/profile/settings/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-secret": authSecret,
        } as HeadersInit,
        body: JSON.stringify({ id: id }),
      });

      if (res.ok) {
        router.push("/admin/auth/login");
      } else {
        alert("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <div className="max-w-md w-full bg-neutral-850 border border-neutral-700 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-semibold text-neutral-100 mb-3 tracking-tight">
          Confirm Delete
        </h1>
        <p className="text-neutral-400 mb-8 text-sm">
          Are you sure you want to logout of the admin panel?
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full cursor-pointer py-3 px-6 rounded-md text-white bg-red-800 hover:bg-red-700 active:bg-red-900 border border-red-700 transition duration-200 disabled:opacity-60"
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>

          <button
            onClick={handleCancel}
            className="cursor-pointer w-full py-3 px-6 rounded-md text-neutral-300 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 border border-neutral-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ADeleteAccount;
