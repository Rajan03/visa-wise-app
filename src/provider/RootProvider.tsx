import { Toaster } from "@/components";
import { AppModals } from "./Modals";
import { TokenListener } from "./TokenRefreshListener";

export async function RootProvider({children}: React.PropsWithChildren) {
  return (
    <>
      {children}
      <AppModals />
      <Toaster />
      <TokenListener />
    </>
  );
}
