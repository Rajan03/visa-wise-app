import { AppNavigation } from "@/components";
import { getLocalStorage } from "@/lib";
import { AuthServiceInstance, DomainServiceInstance } from "@/services/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface DashboardProps extends React.PropsWithChildren {
  params: {
    subDomain: string;
  };
}
export default async function DashboardLayout({
  children,
  params,
}: DashboardProps) {
  // Token is stored in local storage not in cookies
  const cookieStore = cookies();
  const auth = getLocalStorage("user");

  console.log(auth);
  
  if (!auth) {
    redirect("/");
  }

  const decoded = await AuthServiceInstance.verifyIdToken(auth);
  const domain = await DomainServiceInstance.getDomain(decoded.uid);

  if (params.subDomain !== domain?.domain) {
    throw new Error("Invalid domain.", {
      cause: "InvalidDomain",
    });
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
