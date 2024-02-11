import { AppInit } from "@/provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppInit>{children}</AppInit>;
}
