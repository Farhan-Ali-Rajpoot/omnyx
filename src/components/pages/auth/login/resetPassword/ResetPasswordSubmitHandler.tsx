"use client";

import ShowFormError from "@/components/UI/Form/FormError";
import { useForm } from "@/components/UI/Form/useForm";
import { Notify } from "@/components/UI/Notify/Notify";
import { BackendRoutes, FrontendRoutes } from "@/config/urls";
import { secFetch } from "@/libs/secFetch";
import { useRouter } from "next/navigation";

export function ResetPasswordSubmitHandler() {
  const router = useRouter();

  useForm({
    formAttr: "reset-password",
    action: handleSubmit,
  });

  async function handleSubmit({
    data,
    showInputError,
    showFormError,
    clearInputError,
    clearFormError,
  }: {
    data: Record<string, FormDataEntryValue>;
    showInputError: (name: string, message: string) => void;
    showFormError: (message: string | null) => void;
    clearInputError: (name: string) => void;
    clearFormError: () => void;
  }) {
    clearFormError();
    const payload = {
      email: data["email"],
    };

    try {
      const response = await secFetch(BackendRoutes.auth.login.resetPassword.base, {
        method: "POST",
        service: "auth",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(FrontendRoutes.auth.login.resetPassword.verifyCode);
        return;
      } else {
        showFormError(result.error || "Failed to send Code");
        return;
      }
    } catch (err: any) {
      console.log(`Rest form submit error:\n ${err}`);
      ShowFormError(err.error || "Something went wrong");
      Notify({
        type: "error",
        title: err.error || "Something went wrong",
        message:
          "An error occurred while processing your request. Please refresh or try again.",
        duration: 5000,
      });
    }
  }

  return null;
}
