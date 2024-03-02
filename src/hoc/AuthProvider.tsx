"use client";

import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { clientAuth } from "@/services/client";

async function syncFireAuth(token: string) {
  try {
    await clientAuth.signInWithToken(token);
  } catch (error) {
    console.error("Error syncing Firebase Auth", error);
  }
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const session = useAuth();

  useEffect(() => {
    if (!session?.firebaseToken) return;
    syncFireAuth(session.firebaseToken as string);
  }, [session]);
  return <>{children}</>;
}
