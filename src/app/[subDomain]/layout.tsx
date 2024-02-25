import { PageProps } from "@/types";
import { notFound } from "next/navigation";
import { DomainServiceInstance } from "@/services/admin";
import { AuthorizedLayout } from "./_components";

export default async function DashboardLayout({
  children,
  params: { subDomain },
}: PageProps) {
  // Check if Domain exists
  const domain = await DomainServiceInstance.getDomainByDomainName(subDomain);
  if (!domain) notFound();

  return (
    <AuthorizedLayout>
      <main className="min-h-screen flex flex-col">{children}</main>
    </AuthorizedLayout>
  );
}
