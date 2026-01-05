import { SetNewPasswordSubmitHandler } from "@/components/pages/auth/login/resetPassword/SetNewPasswordSubmitHandler";
import { FormError } from "@/components/UI/Form/FormError";
import FormInput from "@/components/UI/Form/FormInput";
import { FormLink } from "@/components/UI/Form/Formlink";
import { FormSubmitButton } from "@/components/UI/Form/FormSubmitButton";
import { PasswordVisibilityToggleButton } from "@/components/UI/Form/PasswordToggleButton";
import { FrontendRoutes } from "@/config/urls";

export default function SetNewPasswordPage() {
  return (
    <>
      <SetNewPasswordSubmitHandler />
      <div className="rounded-2xl p-8 sm:p-[2vw] 3xl:p-10 w-full max-w-md sm:max-w-[30vw] 3xl:max-w-lg">
        <div className="mb-8 sm:mb-[2vw] text-start">
          <h1 className="text-3xl sm:text-[3vw] font-bold text-neutral-800 dark:text-neutral-100">
            Set New Password
          </h1>
          <p className="mt-2 text-sm sm:text-[0.95vw] 3xl:text-base text-neutral-600 dark:text-neutral-400">
            Create a strong password for your account
          </p>
        </div>

        <form data-form="set-new-password" className="space-y-5 sm:space-y-[1.5vw]">
          {/* New Password Input */}

          <FormInput
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            minLength={8}
            required
            enableError
            autoComplete="new-password"
          />
            <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            minLength={8}
            required
            enableError
            autoComplete="new-password"
          />
          <PasswordVisibilityToggleButton  />

          <FormError />

          {/* Submit Button */}
          <FormSubmitButton>Update Password</FormSubmitButton>

          {/* Navigation Link */}
          <div className="text-center pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-sm sm:text-[0.9vw] text-neutral-600 dark:text-neutral-400">
              Back to{" "}
              <FormLink href={FrontendRoutes.auth.login.base}>Login</FormLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
