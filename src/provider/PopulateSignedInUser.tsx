"use client";

import AppWriteService, { AuthUser } from "@/config/appwrite";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useEffect } from "react";

export function PopulateUser({ user }: { user: AuthUser }) {
  const { setUser } = useAuthUser();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
