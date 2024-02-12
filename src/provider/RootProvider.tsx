import { Toaster } from "@/components";
import { AppModals } from "./Modals";
import { AuthProvider } from "./AuthProvider";

export async function RootProvider({children}: React.PropsWithChildren) {
  return (
    <AuthProvider>
      {children}
      <AppModals />
      <Toaster />
    </AuthProvider>
  );
}
