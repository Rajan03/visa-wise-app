import { PageProps } from "@/types";
import { notFound } from "next/navigation";
import { DomainServiceInstance } from "@/services/admin";

export default async function DashboardLayout({
  children,
  params: { subDomain },
}: PageProps) {
  // Check if Domain exists
  const domain = await DomainServiceInstance.getDomainByDomainName(subDomain);
  if (!domain) notFound();

  return (
    <>
      <main className="min-h-screen flex flex-col">
        {children}
      </main>
    </>
  );
}
