import React from "react";
import { DashboardSubNav } from "@/components/domain";

type DashboardLayoutProps = React.PropsWithChildren<{}>;
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className={"flex-1 max-h-12 shadow flex items-center justify-center"}>
        <DashboardSubNav />
      </div>
      <section className="flex-1 flex flex-col overflow-auto">
        {children}
      </section>
    </div>
  );
}
