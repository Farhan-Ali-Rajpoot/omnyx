"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Notify } from "@/components/UI/Notify/Notify";
import { secFetch } from "@/libs/secFetch";
import { BackendRoutes, FrontendRoutes } from "@/config/urls";
import { useForm } from "@/components/UI/Form/useForm";

export function VerifyFormHandler() {
  const router = useRouter();

  // 1. Attach Logic to the Verification Form
  useForm({
    formAttr: "code-verification-form", // Matches id="code-verification-form" in the JSX
    action: handleVerifySubmit,
  });

  // 2. Handle the "Verify" Submission
  async function handleVerifySubmit({
    data,
    showInputError,
    showFormError,
    clearFormError,
  }: {
    data: Record<string, FormDataEntryValue>;
    showInputError: (name: string, message: string) => void;
    showFormError: (message: string | null) => void;
    clearFormError: () => void;
  }) {
    clearFormError();

    const code = data["code"] as string;

    if (!code || code.length !== 6) {
      showInputError("code", "Please enter a valid 6-digit code.");
      return;
    }

    try {
      const res = await secFetch(BackendRoutes.auth.register.codeVerification, { // Assuming this route exists
        service: "auth",
        method: "POST",
        body: JSON.stringify({ code }),
      });

      const result = await res.json();

      if (res.ok) {
        Notify({
          type: "success",
          title: "Email Verified",
          message: "Your email has been successfully verified. You can now login.",
          duration: 3000,
        });
        
        // Redirect to Login page
        router.push(FrontendRoutes.auth.login.base);
        return;
      }

      // Handle specific backend errors
      if (result.matchType === "code") {
        showInputError("code", "Invalid or expired verification code.");
      } else {
        showFormError(result.message || "Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification Error:", err);
      showFormError(err.error || "An unexpected error occurred.");
    }
  }


  useEffect(() => {
    const handleResendClick = async () => {
      try {
        const res = await secFetch(BackendRoutes.auth.register.resendCode, {
            service: "auth",
            method: "POST",
        });

        if (res.ok) {
          Notify({
            type: "success",
            title: "Code Resent",
            message: "A new verification code has been sent to your email.",
          });
        } else {
            const result = await res.json();
            Notify({
                type: "error",
                title: "Resend Failed",
                message: result.message || "Could not resend code. Try again later."
            });
        }
      } catch (error) {
        Notify({
            type: "error",
            title: "Error",
            message: "Network error. Please try again."
        });
      }
    };

    const resendBtn = document.getElementById("resend-code-button");
    if (resendBtn) {
      resendBtn.addEventListener("click", handleResendClick);
    }

    return () => {
      if (resendBtn) {
        resendBtn.removeEventListener("click", handleResendClick);
      }
    };
  }, []);

  return null;
}