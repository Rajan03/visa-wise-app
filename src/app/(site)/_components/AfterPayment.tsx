"use client";

import { EnterIcon } from "@radix-ui/react-icons";
import { Button } from "@/components";
import { AuthServiceInstance } from "@/services/client";
import { ToastState, useShowToast } from "@/hooks";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib";
import Link from "next/link";

// Todo: Handle raise a ticket action
export function PaidButError({ email, name }: { email: string; name: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-md w-full shadow-md border border-gray-100 rounded-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Hey! There was an error
        </h2>
        <p className="text-gray-700 mb-4">
          We received your payment but there was an error while setting up your
          subscription on our end. Please contact us at{" "}
          <a
            href={`mailto:contact@visawise.com`}
            className="text-blue-700 underline"
          >
            VisaWise Email
          </a>{" "}
          and we will help you out.
        </p>

        <p className="text-gray-700 mb-1">
          <strong>Customer Name:</strong> {name}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Customer Email:</strong> {email}
        </p>
        <Button className="mt-4">Raise a ticket</Button>
      </div>
    </div>
  );
}

type SuccessPaymentProps = {
  domain: string;
};

export function SuccessfulPayment({ domain }: SuccessPaymentProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-md w-full shadow-md border border-gray-100 rounded-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Thank you for your payment
        </h2>
        <p className="text-gray-700 mb-4">
          Your payment was successful and your subscription is now active. You
          can start using the VisaWise platform right away.
          <br />
          <br />
          Please check your email for the subscription details. If you have any
          questions, feel free to contact us.
        </p>
        <Button asChild className="mt-4">
          <Link href={`/${domain}`}>
            <EnterIcon className="mr-2" />
            Continue to VisaWise Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
