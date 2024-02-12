"use client";

import { Button } from "@/components";
import { useSignUpModal, useSignInModal, useAuthUser } from "@/hooks";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Hero() {
  const { open: openSignUp } = useSignUpModal();
  const { open: openSignIn } = useSignInModal();
  const { user } = useAuthUser();

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
      {user ? (
        <Button asChild>
          <Link href={user.id}>
            Go to VisaWise
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      ) : (
        <div className="flex gap-x-2">
          <Button onClick={openSignUp}>
            Get VisaWise
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Button>
          <Button onClick={openSignIn} variant={"ghost"}>
            Already have account ?
          </Button>
        </div>
      )}
    </div>
  );
}
