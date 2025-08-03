import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await auth.api.getSession({headers: await headers()});
      if(!!session) {
          redirect("/")
      }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
};

export default AuthLayout;
