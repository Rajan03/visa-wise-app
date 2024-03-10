"use client";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks";
import { Button, Logo } from "@/components";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Navbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background h-20 fixed top-0 flex items-center w-full px-6 py-4 shadow",
        scrolled && "border-b shadow-md transition-all duration-300 ease-in-out"
      )}
    >
      <Link href={"/"} className="flex items-center gap-x-4">
        <Logo />
        <h1 className="text-xl font-bold hidden sm:inline-block">VisaWise</h1>
      </Link>

      <div className="md:ml-auto flex items-center gap-x-8">
        <Button variant={"ghost"}>
          <GitHubLogoIcon />
        </Button>
      </div>
    </div>
  );
}
