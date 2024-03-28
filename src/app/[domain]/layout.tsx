import { redirect } from "next/navigation";
import { PageProps } from "@/types";
import { ClientProvider, DomainProvider, ThemeProvider } from "@/hoc";
import { DomainClient } from "@/services/client";
import { useDomain } from "@/hooks";

export default async function DashboardLayout({ children, params }: PageProps) {
  const { domain } = params;

  // Check if domain exists in firestore
  const existingDomain = await DomainClient.validateDomain(domain);
  const theme = existingDomain.config?.theme || "light";

  // If domain does not exist, redirect to onboarding page
  if (!existingDomain) {
    return redirect("/onboarding");
  }

  // If domain exists, render children
  useDomain.setState({ domain: existingDomain });
  return (
    <ThemeProvider defaultTheme={theme}>
      <DomainProvider domain={existingDomain}>
        <ClientProvider>{children}</ClientProvider>
      </DomainProvider>
    </ThemeProvider>
  );
}
