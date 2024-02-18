"use client";

import { SignInDialog } from "@/components";
import { useSignInModal } from "@/hooks";

export function AppModals() {
  const { isOpen: signIn } = useSignInModal();

  return (
    <>
      {signIn && <SignInDialog />}
    </>
  );
}
