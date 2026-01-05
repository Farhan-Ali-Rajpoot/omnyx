"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ALoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const authSecret = process.env.NEXT_PUBLIC_AUTH_HEADERS_SECRET;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      secretKey: formData.get("secret-key"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-secret": authSecret,
        } as HeadersInit,
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/admin/auth/login");
      } else {
        setError(result.error || "Login failed");
      }

      // handle success, e.g., redirect
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(err.error || "Something went wrong.");
    }
  };

  const handlePasswordToggle = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();

    const passwordInput =
      document.querySelector<HTMLInputElement>(".toggle-password");
    const eye = document.querySelector<HTMLElement>(".eye");
    const eyeHidden = document.querySelector<HTMLElement>(".eye-hidden");

    if (!passwordInput || !eye || !eyeHidden) return;

    const isCurrentlyPassword = passwordInput.type === "password";
    passwordInput.type = isCurrentlyPassword ? "text" : "password";
    eye.classList.toggle("hidden", isCurrentlyPassword);
    eyeHidden.classList.toggle("hidden", !isCurrentlyPassword);
    const target = e.currentTarget as HTMLElement;
    target.childNodes[0].textContent = isCurrentlyPassword
      ? "Hide password"
      : "Show password";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-transparent backdrop-blur-md rounded-xl border border-neutral-700/40 p-8 sm:p-10 shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-neutral-100 tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Restricted access only
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            minLength={5}
            maxLength={60}
            name="secret-key"
            type="password"
            placeholder="Secret Key"
            className="toggle-password"
          />
          <div
            className="text-xs text-gray-500 cursor-pointer flex items-center justify-end m-0"
            onClick={handlePasswordToggle}
          >
            Show password
            <AiOutlineEye className="eye ml-1" />
            <AiOutlineEyeInvisible className="eye-hidden ml-1 hidden" />
          </div>

          <Input
            minLength={7}
            maxLength={50}
            name="name"
            type="text"
            placeholder="Admin Name"
          />
          <Input
            minLength={7}
            maxLength={50}
            name="password"
            type="password"
            placeholder="New Password"
          />

          {error && (
            <div className="py-2 px-4 text-sm font-medium rounded-md text-red-300 bg-red-900/30 border border-red-500/40">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-6 rounded-md bg-neutral-800 text-neutral-100 text-sm font-medium border border-neutral-700 hover:bg-neutral-700 active:bg-neutral-600 transition duration-200 focus:outline-none"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ALoginForm;

interface Props {
  name: string;
  type: string;
  placeholder: string;
  minLength: number;
  maxLength: number;
  className?: string;
}

const Input = ({
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
