"use client";

import { useEffect, useRef } from "react";
import { secFetch } from "@/libs/secFetch";
import { BackendRoutes, FrontendRoutes } from "@/config/urls";
import { hideInputError, showInputError } from "@/components/UI/Form/FormInput";
import { Notify } from "@/components/UI/Notify/Notify";
import { FormSubmitLoader } from "@/components/UI/Form/FormSubmitButton";
import { useRouter } from "next/navigation";

const COOLDOWN_SECONDS = 120;

export function VerifyFormHandler() {
  const router = useRouter();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCooldownTimer = (
    resendButton: HTMLButtonElement,
    initialRemainingSeconds: number
  ) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let timer = initialRemainingSeconds;
    resendButton.disabled = true;

    const tick = () => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      resendButton.textContent = `Resend (${displayMinutes}:${displaySeconds})`;

      timer -= 1;

      if (timer < 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;

        resendButton.textContent = "Resend";
        resendButton.disabled = false;

        Notify({
          type: "info",
          title: "Ready to Resend",
          message: "You can now request a new verification code.",
        });
      }
    };

    tick();

    intervalRef.current = setInterval(tick, 1000);
  };

  useEffect(() => {
    const form = document.getElementById(
      "code-verification-form"
    ) as HTMLFormElement | null;
    const resendButton = document.getElementById(
      "resend-code-button"
    ) as HTMLButtonElement | null;

    if (!form || !resendButton) return;

    const handleResendClick = async () => {
      if (resendButton.disabled) return;

      resendButton.disabled = true;
      resendButton.textContent = "Sending...";

      try {
        const res = await secFetch(BackendRoutes.register.resendCode, {
          service: "auth",
          method: "POST",
        });

        if (res.ok) {
          startCooldownTimer(resendButton, COOLDOWN_SECONDS);
          Notify({
            type: "external",
            title: "Code Sent",
            message: "Verification code has been resent to your email",
          });
          return;
        }

        const errorResult = await res.json();

        if (res.status === 429 && errorResult.errorType === "RATE_LIMIT") {
          const remainingTime = errorResult.remainingTime || 1;

          startCooldownTimer(resendButton, remainingTime);

          Notify({
            type: "warning",
            title: "Too Many Requests",
            message:
              errorResult.error ||
              "Please wait before trying to resend the code.",
          });
          return;
        }

        resendButton.textContent = "Resend";
        resendButton.disabled = false;
        Notify({
          type: "error",
          title: "Failed to resend code",
          message:
            errorResult.error ||
            "Failed to resend verification code. Please try again.",
        });
      } catch (error) {
        console.error("Resend code network/internal error:", error);
        resendButton.textContent = "Resend";
        resendButton.disabled = false;
        Notify({
          type: "error",
          title: "Something went Wrong",
          message:
            "A network error occurred. Please check your connection and try again.",
        });
      }
    };

    const handleFormSubmit = async (event: Event) => {
      event.preventDefault();

      hideInputError("code");
      FormSubmitLoader({ state: true });
      const formData = new FormData(form);
      const code = formData.get("code") as string;

      if (!code || code.length !== 6) {
        FormSubmitLoader({ state: false });
        showInputError("code", "Please enter a valid 6-digit code");
        return;
      }

      try {
        const response: any = await secFetch(BackendRoutes.register.codeVerification, {
          service: "auth",
          method: "POST",
          body: JSON.stringify({ verificationCode: code }),
        });

        const result = await response.json();

        if (response.ok) {
          if (result.ok) {
            router.push(FrontendRoutes.home);
            return;
          }
        }

        if (result.errorType === "EXPIRED") {
          showInputError("code", "Verification Code expired ");
        } else {
          showInputError(
            "code",
            result.error ||
              "Verification failed. Please check the code and try again."
          );
        }
      } catch (err) {
        Notify({
          type: "error",
          title: "Network Error",
          message: "Unable to verify code. Please try again.",
        });
      } finally {
        FormSubmitLoader({ state: false });
      }
    };

    form.addEventListener("submit", handleFormSubmit);
    resendButton.addEventListener("click", handleResendClick);

    return () => {
      form.removeEventListener("submit", handleFormSubmit);
      resendButton.removeEventListener("click", handleResendClick);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [router]);

  return null;
}
