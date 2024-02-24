import { PageProps } from "@/types";
import { AppNavigation } from "@/components";
import { notFound, redirect } from "next/navigation";
import { AuthServiceInstance, UserServiceInstance } from "@/services/admin";
import { cookies } from "next/headers";

 export default async function DashboardLayout({ children, params }: PageProps) {
  const { subDomain } = params;
  // Check if user is authenticated
  const cookieStore = cookies();
  const auth = cookieStore.get("token")?.value;
  if (!auth) {
    redirect(`/${subDomain}`);
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

//  WithLayout(DashboardLayout);