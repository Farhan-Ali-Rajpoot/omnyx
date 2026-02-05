"use client";
import { Notify } from "@/components/UI/Notify/Notify";
import { secFetch } from "@/libs/secFetch";
import { useRouter } from "next/navigation";
import { useForm } from "@/components/UI/Form/useForm";
import { BackendRoutes } from "@/config/urls";

export function LoginFormSubmitHandler() {
  const router = useRouter();

  useForm({
    formAttr: "login",
    action: handleSubmit,
  })

  async function handleSubmit ({
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
  })  {
    clearFormError();

    const payload = {
      email: data["email"] as string,
      password: data["password"] as string,
    };

    try {
      const res = await secFetch(BackendRoutes.auth.login.base, {
        method: "POST",
        service: "auth",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        clearFormError();
        router.push("/");
      } else {
        showFormError( result.error || "Login failed" );
      }
    } catch (err: any) {
      console.error("Error submitting form:", err);
      showFormError( err.error || "Something went wrong." );
      Notify({
        type: "error",
        title: err.error || "Something went wrong",
        message:
          "An error occurred while processing your request. Please refresh or try again.",
        duration: 5000,
      });
    }
  };

  return null;
}
