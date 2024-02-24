import { PageProps } from "@/types";
import { AppNavigation } from "@/components";
import { notFound, redirect } from "next/navigation";
import {
  AuthServiceInstance,
  DomainServiceInstance,
  UserServiceInstance,
} from "@/services/admin";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
  params: { subDomain },
}: PageProps) {
  // Check if Domain exists
  const domain = await DomainServiceInstance.getDomainByDomainName(subDomain);
  if (!domain) notFound();

  // Check if user is authenticated
  const cookieStore = cookies();
  const auth = cookieStore.get("token")?.value;
  if (!auth) {
    redirect(`/${subDomain}/signin`);
  }

  // Check if user has access to the domain
  const decodeVerifyToken = await AuthServiceInstance.verifyIdToken(auth);
  const user = await UserServiceInstance.getUserInDomain(
    decodeVerifyToken.uid,
    subDomain
  );
  if (!user) notFound();
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <AppNavigation />

        {children}
      </main>
    </>
  );
}
