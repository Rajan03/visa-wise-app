"use client";

import { redirect } from "next/navigation";
import { PageProps } from "@/types";
import { AppNavigation } from "@/components";
import { ToastState, useAuthUser, useShowToast } from "@/hooks";
import { useEffect } from "react";

export default function DashboardLayout({ children, params }: PageProps) {
  const { subDomain } = params;
  const showToast = useShowToast();
  const { user, isLoading } = useAuthUser();
  if ((isLoading && !user)) redirect(`/${subDomain}`);

  useEffect(() => {
    const callVerifyDomain = async () => {
      try {
        const { verifyDomain } = await import("./action");
        const token = await user!.getIdToken();
        const authorizedUser = await verifyDomain(token, subDomain);
        console.log({ authorizedUser });
      } catch (error: any) {
        console.log(error.message);
        showToast(ToastState.ERROR, error.message);
        redirect(`/${subDomain}`);
      }
    };
    callVerifyDomain();
  }, [user, subDomain, showToast]);
  
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <AppNavigation />

        {children}
      </main>
    </>
  );
}
