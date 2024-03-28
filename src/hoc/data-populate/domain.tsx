"use client";
import { useDomain } from "@/hooks";
import { IDomain } from "@/types";
import React from "react";

export function DomainProvider({
  children,
  domain,
}: Readonly<React.PropsWithChildren<{ domain: IDomain }>>) {
  React.useEffect(() => {
    useDomain.setState({ domain });
  }, [domain]);

  return <>{children}</>;
}
