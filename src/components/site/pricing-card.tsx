import React from "react";
import { Button } from "@/components/ui";
import { loadStripeInstance } from "@/lib/stripe";
import { ToastState, useShowToast } from "@/hooks";

enum LoadingState {
  Idle = "Idle",
  LoadingStripe = "Loading",
  CheckOutSession = "Checking out",
  Redirecting = "Redirecting...",
  Error = "Error",
}

export function FreePlan() {
  return (
    <div className="shadow p-4 rounded border min-w-[20rem] max-w-[20rem]">
      {/* Header */}
      <div className="text-center p-3 bg-gradient-to-tr from-gray-400 to-gray-200 text-gray-900">
        Free Plan
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-3xl font-bold mb-4">
          $0
          <span className="text-gray-500 text-base">/mo</span>
        </p>
        <p className="text-gray-500 text-xs mb-2">Great for small businesses</p>
        <p className="text-gray-700 text-center text-xs leading-tight mb-6">
          Manage your visa applications with ease and get access to all the
          features
        </p>

        {/* Button */}
        <OnBoardButton />
      </div>

      {/* Footer - features */}
      <div className="px-4 pb-4">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Unlimited Applications</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Unlimited Users</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">24/7 Support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function PaidPlan() {
  return (
    <div className="shadow p-4 rounded border min-w-[20rem] max-w-[20rem]">
      {/* Header */}
      <div className="text-center p-3 bg-gradient-to-tr from-purple-400 to-purple-200 text-gray-900">
        Premuim Plan
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-3xl font-bold mb-4">
          $99
          <span className="text-gray-500 text-base">/mo</span>
        </p>
        <p className="text-gray-500 text-xs mb-2">Great for small businesses</p>
        <p className="text-gray-700 text-center text-xs leading-tight mb-6">
          Manage your visa applications with ease and get access to all the
          features
        </p>

        {/* Button */}
        <OnBoardButton />
      </div>

      {/* Footer - features */}
      <div className="px-4 pb-4">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Unlimited Applications</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Unlimited Users</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">24/7 Support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function OnBoardButton() {
  const showToast = useShowToast();
  const [loadingState, setLoadingState] = React.useState(LoadingState.Idle);
  const isLoading =
    loadingState !== LoadingState.Error && loadingState !== LoadingState.Idle;

  const createSession = async () => {
    setLoadingState(LoadingState.LoadingStripe);

    try {
      // Load Stripe
      const stripe = await loadStripeInstance();
      if (!stripe) {
        throw new Error("Failed to load stripe");
      }

      // Create a new session
      setLoadingState(LoadingState.CheckOutSession);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 100,
          email: "rajan@yopmail.com", // TODO: Get email from user
          domain: "test-domain-2", // TODO: Get domain from user
        }),
      });

      const session = await response.json();
      if (session.error) {
        throw new Error(session.error.message);
      }
      console.log({session});
      

      // Redirect to checkout
      setLoadingState(LoadingState.Redirecting);
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error("Failed to redirect to checkout");
      }
    } catch (error: any) {
      console.log(error);

      showToast(ToastState.ERROR, error.response?.data || "Failed to checkout");
      setLoadingState(LoadingState.Error);
    }
  };

  return (
    <Button
      onClick={createSession}
      disabled={isLoading}
      variant="default"
      className="w-full mb-3"
    >
      {isLoading ? <LoadState state={loadingState} /> : "Get Started"}
    </Button>
  );
}

function LoadState({ state }: { state: LoadingState }) {
  return (
    <div className="flex items-center gap-x-2">
      <span className="w-4 h-4 border-t-2 border-r-2 rounded-full border-white animate-spin" />
      <span>{state}</span>
    </div>
  );
}