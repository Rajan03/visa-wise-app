import { Toaster } from "@/components/ui";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="blue-light">
      <Head />
      <body>
        <Main />
        <Toaster />
        <NextScript />
      </body>
    </Html>
  );
}
