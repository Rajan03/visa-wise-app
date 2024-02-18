"use client";

import axios from "axios";
import React, { useState } from "react";
import { Button, Input, Label } from "@/components";
import { loadStripeInstance } from "@/config/stripe";
import { ToastState, useShowToast } from "@/hooks";
import { APP_SUBSCRIPTION_COST, ENPOINTS } from "@/lib";

enum LoadingState {
  Idle = "Idle",
  LoadingStripe = "Loading",
  CheckOutSession = "Checking out",
  Redirecting = "Redirecting...",
  Error = "Error",
}
export default function Checkout() {
  const showToast = useShowToast();
  const [loadingState, setLoadingState] = useState(LoadingState.Idle);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const orgRef = React.useRef<HTMLInputElement>(null);

  const isLoading =
    loadingState !== LoadingState.Error && loadingState !== LoadingState.Idle;

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = APP_SUBSCRIPTION_COST;
    const email = emailRef.current?.value;
    const org = orgRef.current?.value;

    if (!email || !email.trim() || !org || !org.trim()) {
      showToast(ToastState.ERROR, "Please enter a valid email and organization name");
      return;
    }

    try {
      setLoadingState(LoadingState.LoadingStripe);

      // Load Stripe
      const stripe = await loadStripeInstance();
      if (!stripe) {
        throw new Error("Failed to load stripe");
      }

      // Create a payment session
      setLoadingState(LoadingState.CheckOutSession);
      const checkoutSession = await axios.post(ENPOINTS.checkoutSession, {
        amount,
        email,
        org,
      });

      if (checkoutSession.status !== 200) {
        throw new Error("Failed to create a payment session");
      }

      // Redirect to checkout
      setLoadingState(LoadingState.Redirecting);
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data,
      });

      if (result.error) {
        throw new Error("Failed to redirect to checkout");
      }
    } catch (error: any) {
      console.log(error.response);

      showToast(ToastState.ERROR, error.response?.data || "Failed to checkout");
      setLoadingState(LoadingState.Error);
    }
  };

  return (
    <div className="pt-32 flex flex-col justify-center items-center">
      {/* Heading and description */}
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Checkout Page under maintenance 🚧
      </h1>
      <p className="text-base sm:text-lg text-center text-gray-500 mt-6 max-w-md">
        We&apos;re working hard to bring you a seamless checkout experience. In
        the meantime, you can pay now and continue.
      </p>

      {/* Payment Form */}
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col justify-center mt-6"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Input
            type="email"
            id="email"
            placeholder="Enter your email address"
            className="w-full sm:w-60"
            ref={emailRef}
          />

          <Input
            type="text"
            id="organization"
            placeholder="Enter your organization name"
            className="w-full sm:w-60"
            ref={orgRef}
          />
        </div>

        <p className="text-xs text-gray-500 text-start ml-0.5 mb-1">
          Credentials will be used to create an account for you.
        </p>
        <Button type="submit" variant={"default"} disabled={isLoading}>
          {isLoading ? <LoadState state={loadingState} /> : "Pay Now"}
        </Button>
      </form>
    </div>
  );
}

function LoadState({ state }: { state: LoadingState }) {
  return (
    <div className="flex items-center gap-x-2">
      <span className="w-4 h-4 border-t-2 border-r-2 rounded-full border-foreground animate-spin" />
      <span>{state}</span>
    </div>
  );
}
