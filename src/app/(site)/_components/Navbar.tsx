"use client";
import { Logo } from "@/components";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

export function Navbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] h-20 fixed top-0 flex items-center w-full px-6 py-4 shadow",
        scrolled && "border-b shadow-md transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex items-center gap-x-4">
        <Logo />
        <h1 className="text-xl font-bold">VisaWise</h1>
      </div>

      <div className="md:ml-auto flex items-center gap-x-8">
        <a href="/features" className="hidden md:block hover:underline">
          Features
        </a>
        <a href="/pricing" className="hidden md:block hover:underline">
          Pricing
        </a>
        <a href="/contact" className="hidden md:block hover:underline">
          Contact
        </a>
      </div>
    </div>
  );
}
