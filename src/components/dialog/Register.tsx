"use client";

import { useSignInModal } from "@/hooks";
import { SignInDialog } from "./SignInDialog";

export function AppModals() {
  const { isOpen: signIn } = useSignInModal();

  return (
    <>
      {signIn && <SignInDialog />}
    </>
  );
}
