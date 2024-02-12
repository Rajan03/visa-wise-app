import { Toaster } from "@/components";
import { AppModals } from "./Modals";

export async function RootProvider({children}: React.PropsWithChildren) {
  return (
    <>
      {children}
      <AppModals />
      <Toaster />
    </>
  );
}
