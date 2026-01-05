"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ShowFormError from "../UI/Form/FormError";

const ALoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const authSecret = process.env.NEXT_PUBLIC_AUTH_HEADERS_SECRET;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    ShowFormError({ state: false });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-secret": authSecret,
        } as HeadersInit,
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        ShowFormError({ error: result.error || "Authentication failed"});
      }
    } catch (err: any) {
      ShowFormError({ error: "Network error. Please try again."});
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-neutral-950 to-neutral-900 p-6">
        <div className="w-full max-w-md sharp-shadow bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-8 sm:p-10 transition-all duration-300 hover:border-neutral-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-neutral-100 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Restricted system access
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <Input
                name="name"
                type="text"
                placeholder="Admin identifier"
                minLength={3}
                maxLength={60}
              />
              <Input
                name="password"
                type="password"
                placeholder="Authorization key"
                minLength={7}
                maxLength={50}
                className="toggle-password"
              />

              <div className="flex items-center justify-between ">
                <Link
                  href="/admin/auth/reset-password"
                  className="text-xs text-neutral-400 hover:text-sky-400 transition-colors"
                >
                  Forgot credentials?
                </Link>
                <div
                  className="text-xs text-gray-500 cursor-pointer flex items-center"
                >
                  Show password
                  <AiOutlineEye className="eye ml-1" />
                  <AiOutlineEyeInvisible className="eye-hidden ml-1 hidden" />
                </div>
              </div>
            </div>


              <div className="form-error-element hidden py-2 px-3 text-sm font-medium rounded-sm text-red-300 bg-red-900/30 border border-red-800/50 animate-pulse">
              </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-3 text-sm text-white rounded-sm w-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-100 font-medium transition-all duration-200 ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:border-neutral-600"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin"></span>
                  Authenticating...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
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
