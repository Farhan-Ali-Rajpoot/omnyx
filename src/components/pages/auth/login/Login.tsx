import GoogleLoginButton from "./GoogleLoginButton";
import { FormError } from "@/components/UI/Form/FormError";
import FormInput from "@/components/UI/Form/FormInput";
import { FormSubmitButton } from "@/components/UI/Form/FormSubmitButton";
import { PasswordVisibilityToggleButton } from "@/components/UI/Form/PasswordToggleButton";
import { FormLink } from "@/components/UI/Form/Formlink";
import { LoginFormSubmitHandler } from "./LoginSubmitHandler";
import { FrontendRoutes } from "@/config/urls";
import { Badge } from "@/components/UI/Badge";

const LoginForm = () => {
  return (
    <>
      <LoginFormSubmitHandler />
      
      <div className="w-full max-w-[calc(var(--sfu)*28)] p-[calc(var(--sfu)*2)]">
        {/* Heading */}
        <div className="mb-[calc(var(--sfu)*1.5)] text-start">
          <h1 className="text-[calc(var(--sfu)*3)] font-extrabold ">
            Login
          </h1>
        </div>

        <form data-form="login" className="space-y-[calc(var(--sfu)*1.7)]">
          {/* <GoogleLoginButton /> */}

          {/* OR Divider */}
          {/* <div className="flex items-center">
            <div className="flex-grow border-t border-[var(--color-border-surface)]"></div>
            <Badge className="bg-[var(--color-electric-indigo)] text-[var(--color-text-action)]">OR</Badge>
            <div className="flex-grow border-t border-[var(--color-border-surface)]"></div>
          </div> */}

          {/* Inputs */}
          <div className="flex flex-col gap-[calc(var(--sfu)*1)]">
            <FormInput
              minLength={7}
              maxLength={60}
              name="email"
              type="email"
              label="Email Address"
            />
            <FormInput
              minLength={7}
              maxLength={50}
              name="password"
              type="password"
              label="Password"
            />
            <PasswordVisibilityToggleButton />
          </div>

          <FormError />

          <FormSubmitButton>Login</FormSubmitButton>
        </form>

        {/* Bottom text */}
        <div className="mt-[calc(var(--sfu)*1.5)] text-center text-[calc(var(--sfu)*1)]">
          <FormLink href={FrontendRoutes.auth.login.resetPassword.base}>
            Forgot Password?
          </FormLink>
        </div>
      </div>
    </>
  );
};

export default LoginForm;