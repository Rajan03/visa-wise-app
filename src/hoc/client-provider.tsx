"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export function ClientProvider({ children }: Readonly<React.PropsWithChildren>) {
  return <SessionProvider>{children}</SessionProvider>;
}
