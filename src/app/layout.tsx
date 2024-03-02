import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { AppModals } from "@/components";
import ClientProvider from "@/hoc/ClientProvider";

import "../styles/globals.css";
import { AuthProvider } from "@/hoc";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VisaWise",
  description: "VisaWise",
};

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            font.className
          )}
        >
          <AuthProvider>
            {children}
            <AppModals />
          </AuthProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
