"use client";

import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AChangePasswordPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authSecret = process.env.NEXT_PUBLIC_AUTH_HEADERS_SECRET || "";

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "/api/admin/profile/settings/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-secret": authSecret,
          } as HeadersInit,
          body: JSON.stringify({ id, currentPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password change failed");
      } else {
        router.push("/admin/dashboard/profile/settings");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
const handlePasswordToggle = (e: React.MouseEvent<HTMLParagraphElement>) => {
  e.preventDefault();

  const passwordInputs = document.querySelectorAll<HTMLInputElement>(".toggle-password");
  const eye = document.querySelector<HTMLElement>(".eye");
  const eyeHidden = document.querySelector<HTMLElement>(".eye-hidden");

  if (!passwordInputs || !eye || !eyeHidden) return;

  // Check the first input's current type to determine toggle direction
  const isCurrentlyPassword = passwordInputs[0].type === "password";

  // Toggle all password inputs
  passwordInputs.forEach((input) => {
    input.type = isCurrentlyPassword ? "text" : "password";
  });

  // Toggle icons
  eye.classList.toggle("hidden", isCurrentlyPassword);
  eyeHidden.classList.toggle("hidden", !isCurrentlyPassword);

  // Change label text
  const target = e.currentTarget as HTMLElement;
  const labelNode = target.childNodes[0];
  if (labelNode && labelNode.nodeType === Node.TEXT_NODE) {
    labelNode.textContent = isCurrentlyPassword ? "Hide passwords" : "Show passwords";
  }
};


  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-md sharp-shadow bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-8 sm:p-10 relative">
        <Link
          href="/admin/dashboard/profile/settings"
          className="absolute top-6 left-6 flex items-center justify-center rounded-md h-10 w-10 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors duration-200"
        >
          <FaArrowLeft className="text-lg text-neutral-300" />
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-100 tracking-tight">
            UPDATE CREDENTIALS
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Secure your account access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            minLength={7}
            className="toggle-password"
          />

          <InputField
            name="newPassword"
            type="password"
            placeholder="New Password"
            minLength={7}
            className="toggle-password"
          />

          <InputField
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            minLength={7}
            className="toggle-password"
          />
          <div
            className="text-xs text-gray-500 cursor-pointer flex items-center justify-end "
            onClick={handlePasswordToggle}
          >
            Show passwords
            <AiOutlineEye className="eye ml-1" />
            <AiOutlineEyeInvisible className="eye-hidden ml-1 hidden" />
          </div>

          {error && (
            <div className="py-2 px-4 text-sm rounded-md text-red-300 bg-red-900/30 border border-red-800/50 animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-3 rounded-sm text-sm border font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
              isSubmitting
                ? "bg-neutral-800 border-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-100 hover:border-neutral-600"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin"></span>
                Updating...
              </>
            ) : (
              <>
                <FaLock />
                Change Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

interface Props {
  name: string;
  type: string;
  placeholder: string;
  minLength: number;
  maxLength?: number;
  className?: string;
}

const InputField = ({
  name,
  type,
  placeholder,
  minLength,
  maxLength,
  className,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-gray-500 uppercase">
        {placeholder}
      </label>
      <input
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        className={`py-2 px-3 text-sm text-neutral-100 rounded-sm bg-neutral-800 focus:outline-none w-full border border-neutral-600 focus:ring-1 focus:ring-neutral-500 transition-all ${className}`}
        required
      />
    </div>
  );
};

export default AChangePasswordPage;
