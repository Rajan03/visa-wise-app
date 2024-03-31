import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  // Handle loading when the page change is in progress
  if (router.isFallback) {
    return <div className="text-2xl font-bold text-center mt-4">Loading...</div>;
  }

  return <Component {...pageProps} />;
}
