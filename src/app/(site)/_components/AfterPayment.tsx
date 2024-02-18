"use client";

import { EnterIcon, CircleIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { useState } from "react";
import { ENDPOINTS, setLocalStorage } from "@/lib";
import { ToastState, useShowToast } from "@/hooks";
import { AuthServiceInstance } from "@/services/client";

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
  userId: string;
};
export function SuccessfulPayment({ domain, userId }: SuccessPaymentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  /**
   * Method calls login endpoint to get the custom token and then signin with the token
   * to get the user details and then sets local storage with the user token (JWT)
   * and redirects to the dashboard 
   */
  const loginToDashboard = async () => {
    setLoading(true);
    try {
      // TODO: try to do it in one single call
      // get the custom token from the server
      const res = await fetch(ENDPOINTS.login, {
        method: "POST",
        body: JSON.stringify({ id: userId }),
      });

      if (res.ok) {
        // sign in with the token
        const token = await res.text();
        const user = await AuthServiceInstance.signInWithToken(token);

        if (user?.user.uid) {
          // set the user token in local storage
          const jwt = await user.user.getIdToken();
          setLocalStorage("user", jwt);

          // redirect to the dashboard
          const url = `/${domain}`;
          router.replace(url);
        }
      }
    } catch (error: any) {
      console.error(error);
      showToast(ToastState.ERROR, error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <Button disabled={loading} onClick={loginToDashboard} className="mt-4">
          {loading ? (
            <CircleIcon className="mr-2" />
          ) : (
            <>
              <EnterIcon className="mr-2" />
              Continue to VisaWise Dashboard
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
