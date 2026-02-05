"use client";

import ShowFormError from "@/components/UI/Form/FormError";
import { useForm } from "@/components/UI/Form/useForm";
import { Notify } from "@/components/UI/Notify/Notify";
import { BackendRoutes, FrontendRoutes } from "@/config/urls";
import { secFetch } from "@/libs/secFetch";
import { useRouter } from "next/navigation";

export function VerifyCodeSubmitHandler() {
  const router = useRouter();

  useForm({
    formAttr: "verify-code",
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
    const payload = {
      code: data["code"],
    };

    try {
      const response = await secFetch(BackendRoutes.auth.login.resetPassword.verifyCode, {
        method: 'POST',
        service: "auth",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(FrontendRoutes.auth.login.resetPassword.setNewPassword);
        return;
      }

      showInputError('code', result.error || "Failed verify Code");

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
