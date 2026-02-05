"use client";
import { useRouter } from "next/navigation";
import { Notify } from "@/components/UI/Notify/Notify";
import { secFetch } from "@/libs/secFetch";
import { RegistrationBody } from "@/app/api/auth/register/route";
import { BackendRoutes, FrontendRoutes } from "@/config/urls";
import { useForm } from "@/components/UI/Form/useForm";

export function RegisterFormSubmitHandler() {
  const router = useRouter();

  useForm({
    formAttr: "register",
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
    clearInputError("name");
    clearFormError();

    const termsChecked = data["terms"] === "on";
    if (!termsChecked) {
      showFormError("Please agree to the terms and conditions.");
      return;
    }

    const payload: RegistrationBody = {
      name: data["name"] as string,
      email: data["email"] as string,
      password: data["password"] as string,
      provider: "email",
    };

    try {
      const res = await secFetch(BackendRoutes.auth.register.base, {
        service: "auth",
        method: "POST",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        Notify({
          type: "external",
          title: "Check your Email",
          message:
            "📧 Please check your email (including your Gmail inbox) and verify your account to proceed.",
          button: {
            text: "Email",
            href: "mail.google.com",
          },
          duration: 5000,
        });
        clearFormError();

        router.push(FrontendRoutes.auth.register.codeVerification);
        return;
      }

      if (result.matchType == "name") {
        showInputError("name", "This Username already have taken.");
      } else {
        clearFormError();
      }
    } catch (err: any) {
      console.error("Error submitting form:", err);
      showFormError(err.error || "Something went wrong." );
      Notify({
        type: "error",
        title: err.error || "Something went wrong",
        message: "We encountered an unexpected error. Please try again later.",
        duration: 5000,
      });
    }
  }

  return null;
}
