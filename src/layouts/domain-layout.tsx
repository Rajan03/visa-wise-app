import React from "react";
import { AppNavbar } from "@/components/domain";
import { AppDialogProvider } from "@/components/dialog";
import { DomainProvider } from "@/hoc/domain-provider";
import { useAuth } from "@/hooks";
import { Loading } from "@/components/ui";
import { Montserrat } from "next/font/google";

const font = Montserrat({
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

type DomainLayoutProps = React.PropsWithChildren<{}>;
export function DomainLayout({ children }: DomainLayoutProps) {
  const { user, loading } = useAuth();
  
  if (loading) return <Loading />;

  return (
    <DomainProvider>
      <AppNavbar user={user} />
      <main style={font.style} className="relative top-16 min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex flex-col">
        {children}
      </main>
      <AppDialogProvider />
    </DomainProvider>
  );
}
