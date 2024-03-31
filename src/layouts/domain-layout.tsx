import React from "react";
import { useDomain } from "@/hooks";
import { AppNavbar } from "@/components/domain";
import { Error, Loading } from "@/components/ui";
import { ThemeProvider, SessionProvider } from "@/hoc";
import { FirebaseError } from "firebase/app";

type DomainLayoutProps = React.PropsWithChildren<{}>;
export function DomainLayout({ children }: DomainLayoutProps) {
  const { domain, loading, error } = useDomain();

  if (loading) return <Loading />;
  if (error) return <Error error={(error as FirebaseError).message} />;
  if (!domain) return <Error error="Domain not found" />;

  return (
    <ThemeProvider defaultTheme={domain.config?.theme || "blue-light"}>
      <SessionProvider>
        <AppNavbar />
        <main className="relative top-20 min-h-[calc(100vh-5rem)] flex flex-col px-2">
          {children}
        </main>
      </SessionProvider>
    </ThemeProvider>
  );
}
