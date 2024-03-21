import { PageProps } from "@/types";
import { AppNavigation } from "@/components";

export default function DashboardLayout({ children, params }: PageProps) {
  return (
    <>
        <main className="min-h-screen flex flex-col">
          <AppNavigation />

          {children}
        </main>
    </>
  );
}
