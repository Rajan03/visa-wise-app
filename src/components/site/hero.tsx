import { Button } from "@/components/ui";
import Link from "next/link";

export function Hero() {
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
        <Button asChild>
          <Link href="/pricing">
            <span>Try VisaWise</span>
          </Link>
        </Button>
        <Button variant={"ghost"}>Have a doubt ?</Button>
      </div>
    </div>
  );
}
