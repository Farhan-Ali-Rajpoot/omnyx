import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export function PasswordVisibilityToggleButton() {
  return (
    <>
      <div
        data-password-toggle
        data-state="show"
        className="group w-full text-end flex items-center justify-end"
      >
        <div
          className="
            flex items-center justify-center cursor-pointer
            text-neutral-500 dark:text-neutral-300
            text-[calc(var(--sfu)*0.85)] 
            leading-[calc(var(--sfu)*1.1)]
          "
        >
          <p className="block group-data-[state='show']:hidden">Show Password</p>
          <p className="hidden group-data-[state='show']:block">Hide Password</p>
          
          <AiOutlineEye 
            className="
              block group-data-[state='show']:hidden eye 
              ml-[calc(var(--sfu)*0.35)]
            " 
          />
          <AiOutlineEyeInvisible 
            className="
              hidden group-data-[state='show']:block eye-hidden 
              ml-[calc(var(--sfu)*0.35)]
            " 
          />
        </div>
      </div>
    </>
  );
}