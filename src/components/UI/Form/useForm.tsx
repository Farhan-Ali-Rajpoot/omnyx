"use client";

import { useEffect, useCallback } from "react";

interface UseFormProps {
  formAttr: string;
  action: (params: {
    data: Record<string, FormDataEntryValue>;
    showInputError: (name: string, message: string) => void;
    showFormError: (message: string | null) => void;
    clearInputError: (name: string) => void;
    clearFormError: () => void;
  }) => Promise<void>;
  enablePasswordToggle?: boolean;
}

export function useForm({
  formAttr,
  action,
  enablePasswordToggle = true,
}: UseFormProps) {
  const handleSubmit = useCallback(
    async (e: Event) => {
      e.preventDefault();

      const form = e.currentTarget as HTMLFormElement;

      const submitBtn = form.querySelector<HTMLButtonElement>(
        "button[type='submit']"
      );
      const formData = new FormData(form);
      const data: Record<string, FormDataEntryValue> = Object.fromEntries(
        formData.entries()
      );

      const showInputError = (name: string, message: string) => {
        const input = form.querySelector<HTMLInputElement>(`[data-input="${name}"]`);
        const errorSpan = form.querySelector(`[data-input-error="${name}"]`);
        if (input && errorSpan) {
          input.setAttribute("data-error", "");
          errorSpan.textContent = message;
        }
      };

      const clearInputError = (name: string) => {
        const input = form.querySelector<HTMLInputElement>(`[data-input="${name}"]`);
        const errorSpan = form.querySelector(`[data-input-error="${name}"]`);

        if (input && errorSpan) {
          input.removeAttribute("data-error");
          errorSpan.textContent = "";
        }
      };

      const showFormError = (message: string | null) => {
        const existing =
          form.querySelector<HTMLDivElement>("[data-form-error]");
        if (existing) {
          existing.setAttribute("data-state", "show");
          existing.textContent = message || "An error occurred";
        }
      };

      const clearFormError = () => {
        const existing =
          form.querySelector<HTMLDivElement>("[data-form-error]");
        if (existing) {
          existing.setAttribute("data-state", "hide");
          existing.textContent = "";
        }
      };

      form
        .querySelectorAll<HTMLInputElement>("input")
        .forEach((input) => input.setCustomValidity(""));
      const formErrorDiv =
        form.querySelector<HTMLDivElement>("[data-form-error]");
      if (formErrorDiv) formErrorDiv.textContent = "";

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.dataset.state = "loading";
        }

        await action({
          data,
          showInputError,
          showFormError,
          clearInputError,
          clearFormError,
        });
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.dataset.state = "idle";
        }
      }
    },
    [action]
  );

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>(
      `[data-form="${formAttr}"]`
    );
    if (!form) return;

    form.addEventListener("submit", handleSubmit);

    if (enablePasswordToggle) {
      const toggleBtn = form.querySelector<HTMLButtonElement>(
        "[data-password-toggle]"
      );
      const passwordInput = form.querySelector<HTMLInputElement>(
        'input[type="password"]'
      );

      if (toggleBtn && passwordInput) {
        toggleBtn.dataset.state = "hidden";

        const toggleHandler = () => {
          const isPassword = passwordInput.type === "password";
          passwordInput.type = isPassword ? "text" : "password";
          toggleBtn.dataset.state = isPassword ? "show" : "hidden";
        };

        toggleBtn.addEventListener("click", toggleHandler);

        return () => toggleBtn.removeEventListener("click", toggleHandler);
      }
    }

    return () => form.removeEventListener("submit", handleSubmit);
  }, [formAttr, handleSubmit, enablePasswordToggle]);
}
