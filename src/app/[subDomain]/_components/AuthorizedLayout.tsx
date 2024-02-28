"use client";
import { useAuthUser } from "@/hooks";
import { AuthServiceInstance } from "@/services/client";
import React, { useEffect } from "react";

type AuthenticatedLayoutProps = React.PropsWithChildren<{}>;

export function AuthorizedLayout({ children }: AuthenticatedLayoutProps) {
  const {isLoading, setUser} = useAuthUser();

  // TODO: Page reload redirects to home a it takes time to verify the user is authenticated
  useEffect(() => {
    const un = AuthServiceInstance.onAuthStateChanged((user) => {
      if (user) {
        console.log("Authenticated");
        setUser(user);
      } else {
        console.log("Not Authenticated");
        setUser(null);
      }
    });
    return () => un();
  }, []);


  return (
    <>
    {isLoading && <div className="h-1 bg-foreground w-[80%] fixed top-0 animate-in" />}
      {children}
    </>
  );
}
