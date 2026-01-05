import { AuthDecorativePanel } from "@/components/layout/layouts/auth/AuthDecorativePanel";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        className="overflow-hidden flex"
      >
        {/* LEFT DECORATIVE PANEL */}
        <AuthDecorativePanel />

        {/* RIGHT FORM SECTION */}
        <div
          className="
          flex items-center justify-center w-full
          py-[calc(var(--sfu)*2)]
          lg:w-1/2 lg:mr-[calc(var(--sfu)*1)]
        "
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;


