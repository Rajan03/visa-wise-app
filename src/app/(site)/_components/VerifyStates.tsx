'use client';
import Image from "next/image";
import { EnterIcon } from "@radix-ui/react-icons";
import { Button } from "@/components";
import { useSignInModal } from "@/hooks";

export function ErrorUI() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Invalid Verification
      </h1>
      <h3 className="text-base sm:text-xl font-medium text-center">
        Please check your email for the verification link
      </h3>
    </div>
  );
}

export function SuccessUI() {
  const { open } = useSignInModal();

  return (
    <div className="max-w-3xl mx-auto space-y-8 flex flex-col justify-center items-center">
      <Image
        alt="email_verified"
        src="/email_verified.gif"
        width={400}
        height={400}
      />

      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Your Email is Verified
      </h1>
      <h3 className="text-base sm:text-xl font-medium text-center">
        You can now login to your account
      </h3>
      <Button onClick={open}>
        Sign In
        <EnterIcon className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}