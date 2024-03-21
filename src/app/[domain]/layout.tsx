import { PageProps } from "@/types";
import { ClientProvider } from "@/hoc";
import { DomainClient } from "@/services/client";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children, params }: PageProps) {
  const { domain } = params;

  // Check if domain exists in firestore
  const existingDomain = await DomainClient.validateDomain(domain); 

  // If domain does not exist, redirect to onboarding page
  if (!existingDomain) {
    return redirect("/onboarding");
  }

  // If domain exists, render children
  return (
    <>
      <ClientProvider>
          {children}
      </ClientProvider>
    </>
  );
}
