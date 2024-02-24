"use client";

import { AuthServiceInstance } from "@/services/client";
import { useEffect } from "react";

export function TokenListener({children}: React.PropsWithChildren) {
  useEffect(() => {
    AuthServiceInstance.onTokenRefresh();
  }, []);

  return children;
}
