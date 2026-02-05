import GoogleSignInButton from "./GoogleSignupButton";
import { FormLink } from "@/components/UI/Form/Formlink";
import FormInput from "@/components/UI/Form/FormInput";
import { PasswordVisibilityToggleButton } from "@/components/UI/Form/PasswordToggleButton";
import { FormSubmitButton } from "@/components/UI/Form/FormSubmitButton";
import { RegisterFormSubmitHandler } from "./RegisterFormSubmitHandler";
import { FormError } from "@/components/UI/Form/FormError";
import { FrontendRoutes } from "@/config/urls";
import { Checkbox } from "@/components/UI/Form/Checkbox";
import { Badge } from "@/components/UI/Badge";

const RegisterForm = () => {
  return (
    <>
      <RegisterFormSubmitHandler />

      <div
        className="
          w-full
          max-w-[calc(var(--sfu)*28)]
          p-[calc(var(--sfu)*2)]
        "
      >
        {/* Heading */}
        <div className="mb-[calc(var(--sfu)*1.5)] text-start">
          <h1 className="text-[calc(var(--sfu)*3)] font-bold">
            Sign up
          </h1>
        </div>

        <form data-form="register" className="space-y-[calc(var(--sfu)*1.7)]">
          {/* <GoogleSignInButton /> */}

          {/* OR Divider */}
          {/* <div className="flex items-center">
            <div className="flex-grow border-t border-[var(--color-border-surface)]"></div>
             <Badge className="bg-[var(--color-electric-indigo)] text-[var(--color-text-action)]">OR</Badge>
            <div className="flex-grow border-t border-[var(--color-border-surface)]"></div>
          </div> */}

          {/* Inputs */}
          <div className="flex flex-col gap-[calc(var(--sfu)*1)]">
            <FormInput
              enableError={true}
              minLength={3}
              maxLength={50}
              name="name"
              type="text"
              label="Full Name"
            />
            <FormInput
              minLength={7}
              maxLength={60}
              name="email"
              type="email"
              label="Email"
            />
            <FormInput
              id="password-input"
              minLength={7}
              maxLength={50}
              name="password"
              type="password"
              label="Create Password"
            />
            <PasswordVisibilityToggleButton />
          </div>

          <FormError />

          {/* Terms */}
          <div className="flex items-center gap-[calc(var(--sfu)*0.75)] text-[calc(var(--sfu)*0.8625)]">
            <Checkbox name={"terms"} size="medium" />
            <label
              htmlFor="terms"
            >
              I agree to the{" "}
              <FormLink href={FrontendRoutes.legal.privacy}>Privacy Policy</FormLink>
            </label>
          </div>

          <FormSubmitButton>Sign up</FormSubmitButton>
        </form>

        {/* Bottom text */}
        <div className="mt-[calc(var(--sfu)*1.5)] text-center text-[calc(var(--sfu)*1)]">
          Already have an account?{" "}
          <FormLink href={FrontendRoutes.auth.login.base}>Login</FormLink>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
