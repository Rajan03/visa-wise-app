import { AppNavigation } from "@/components";
import { AuthServiceInstance, DomainServiceInstance } from "@/services/admin";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface DashboardProps extends React.PropsWithChildren {
  params: {
    subDomain: string;
  };
}
export default async function DashboardLayout({
  children,
  params,
}: DashboardProps) {
 const cookieStore = cookies();
 const auth = cookieStore.get("token")?.value;
 if (!auth) {
   redirect("/checkout");
 }

 const decoded = await AuthServiceInstance.verifyIdToken(auth);
 const domain = await DomainServiceInstance.getDomain(decoded.uid);

 if (params.subDomain !== domain?.domain) {
   notFound();
 }

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <AppNavigation />

        {children}
      </main>
    </>
  );
}
