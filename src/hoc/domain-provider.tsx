import { ReactNode } from "react";
import { useDomain } from "@/hooks";
import { FirebaseError } from "firebase/app";
import { Error, Loading } from "@/components/ui";
import { ThemeProvider, SessionProvider } from "@/hoc";

type DomainProviderProps = {
  children: ReactNode;
};

export function DomainProvider({ children }: DomainProviderProps) {
  const { domain, loading, error } = useDomain();

  if (loading) return <Loading />;
  if (error) return <Error error={(error as FirebaseError).message} />;
  if (!domain) return <Error error="Domain not found" />;

  return (
    <ThemeProvider defaultTheme={domain.config?.theme || "blue-light"}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
