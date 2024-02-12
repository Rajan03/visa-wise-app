"use client";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "@/hooks";
import AppWriteService from "@/config/appwrite";

// Todo: Find Some better way to work with loading or appwrite on server side
export function AuthProvider({ children }: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const { setSession } = useAuthUser();

  useEffect(() => {
    const populate = async () => {
      setIsLoading(true);
      const session = await AppWriteService.getSignedInSession();
      setSession(session);
      setIsLoading(false);
    };
    populate();
  }, [setSession]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
}
