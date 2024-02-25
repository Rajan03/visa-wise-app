"use client";
import { useAuthUser } from "@/hooks";
import { AuthServiceInstance } from "@/services/client";
import React, { useEffect } from "react";

type AuthenticatedLayoutProps = React.PropsWithChildren<{}>;

export function AuthorizedLayout({ children }: AuthenticatedLayoutProps) {
  
  useEffect(() => {
    const un = AuthServiceInstance.onAuthStateChanged((user) => {
      if (user) {
        console.log("Authenticated");
        useAuthUser.setState({ user });
      } else {
        console.log("Not Authenticated");
      }
    });
    return () => un();
  }, []);

  return <>{children}</>;
}
