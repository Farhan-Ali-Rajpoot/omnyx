import { FormError } from "@/components/UI/Form/FormError";
import FormInput from "@/components/UI/Form/FormInput";
import { FormLink } from "@/components/UI/Form/Formlink";
import { FormSubmitButton } from "@/components/UI/Form/FormSubmitButton";
import { FrontendRoutes } from "@/config/urls";
import { ResetPasswordSubmitHandler } from "@/components/pages/auth/login/resetPassword/ResetPasswordSubmitHandler"; 

export default function ResetPassword() {
  return (
    <>
    <ResetPasswordSubmitHandler />
      <div className="rounded-2xl p-8 sm:p-[2vw] 3xl:p-10 w-full max-w-md sm:max-w-[30vw] 3xl:max-w-lg">
        <div className="mb-8 sm:mb-[2vw] text-start">
          <h1 className="text-3xl sm:text-[3vw] font-bold text-neutral-800 dark:text-neutral-100">
            Forgot Password?
          </h1>
          <p className="mt-2 text-sm sm:text-[0.95vw] 3xl:text-base text-neutral-600 dark:text-neutral-400">
            We'll send 6 digit code to your email
          </p>
        </div>

        <form data-form="reset-password" className="space-y-6 sm:space-y-[1.5vw]">
          {/* Email Input */}
          <FormInput
            name="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            required
            enableError
          />
          <FormError />

          {/* Submit Button */}
          <FormSubmitButton>Send Code</FormSubmitButton>

          {/* Back to Login Link */}
          <div className="text-center">
            <p className="text-sm sm:text-[0.9vw] text-neutral-600 dark:text-neutral-400">
              Remember your password?{" "}
              <FormLink href={FrontendRoutes.auth.login.base}>
                Back to Login
              </FormLink>
            </p>
          </div>
        </form>

        {/* Additional Help Text */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs sm:text-[0.8vw] text-neutral-500 dark:text-neutral-400 text-center">
            If you don't receive an email within a few minutes, please check your spam folder.
          </p>
        </div>
      </div>
    </>
  );
}