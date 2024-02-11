import { AppInit } from "@/provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppInit>{children}</AppInit>;
}
