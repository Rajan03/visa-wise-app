"use client";

import { SignInDialog, SignUpDialog } from "@/components";
import { useSignInModal, useSignUpModal } from "@/hooks";

export function AppModals() {
  const { isOpen: signIn } = useSignInModal();
  const { isOpen: signUp } = useSignUpModal();

  return (
    <>
      {signIn && <SignInDialog />}
      {signUp && <SignUpDialog />}
    </>
  );
}
