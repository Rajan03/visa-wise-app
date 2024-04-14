import React from "react";
import { AppNavbar } from "@/components/domain";
import { AppDialogProvider } from "@/components/dialog";
import { DomainProvider } from "@/hoc/domain-provider";

type DomainLayoutProps = React.PropsWithChildren<{}>;
export function DomainLayout({ children }: DomainLayoutProps) {
  return (
    <DomainProvider>
      <AppNavbar />
      <main className="relative top-20 min-h-[calc(100vh-5rem)] flex flex-col px-2">
        {children}
      </main>
      <AppDialogProvider />
    </DomainProvider>
  );
}
