import React from "react";
import { ThemeProvider, SessionProvider } from "@/hoc";
import { AppNavbar } from "@/components/domain";
import { useDomain } from "@/hooks";
import { useRouter } from "next/router";
import { Error, Loading } from "@/components/ui";

type DomainLayoutProps = React.PropsWithChildren<{}>;
export function DomainLayout({ children }: DomainLayoutProps) {
  const router = useRouter();
  const { domain: domainId } = router.query;
  const { domain, loading, error, getDomain } = useDomain();

  React.useEffect(() => {
    getDomain(domainId as string);
  }, [domainId, getDomain]);

  if (loading) return <Loading />;

  if ((!loading && error) || !domain)
    return <Error error={error || "Domain not found"} />;

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
