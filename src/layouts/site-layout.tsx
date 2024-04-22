import { SiteNavbar } from "@/components/site";
import React from "react";

export function SiteLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <SiteNavbar />
      <main className="relative top-16 min-h-[calc(100vh-4rem)] flex flex-col px-2">
        {children}
      </main>
    </>
  );
};
