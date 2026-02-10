import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { decodeJwtTokenFromRequest } from "@/libs/DecodeJwtTokenFromCookies"; 
import { Footer } from "@/components/layout/layouts/Footer/Footer";
import { JwtPayload } from "jsonwebtoken";
import type { User } from "@/components/@types/Layout";
import { Tokens } from "@/config/tokens";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user: User | string | JwtPayload | null = await decodeJwtTokenFromRequest(Tokens.user.session);

  return (
    <>
      <div className="">
        <Navbar user={user} />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default layout;
