"use client";
import { Button } from "@/components";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/hooks";
import Link from "next/link";

export function Hero() {
  const session = useAuth();
  return (
    <div className="max-w-3xl mx-auto space-y-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Your Clients, Documents, & Team. Unified. Welcome to{" "}
        <span className="underline">VisaWise</span>
      </h1>
      <h3 className="text-base sm:text-xl font-medium text-center">
        VisaWise is the platform that streamlines and simplifies <br />
        the visa application process for individuals and businesses.
      </h3>
      <div className="flex gap-x-2">
        {session?.user ? (
          <Button asChild>
            <Link href="/dashboard">
              <span>Go to Dashboard</span>
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <Button>
            <span>Get VisaWise</span>
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Button>
        )}
        <Button variant={"ghost"}>Have a doubt ?</Button>
      </div>
    </div>
  );
}
