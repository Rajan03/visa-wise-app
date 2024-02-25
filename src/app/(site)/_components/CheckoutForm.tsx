"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loadInstance } from "@/config/stripe";
import { ToastState, useShowToast } from "@/hooks";
import { Alert, Button, Input } from "@/components";
import { APP_SUBSCRIPTION_COST, ENDPOINTS } from "@/lib";

type Inputs = {
  email: string;
  organization: string;
};

enum LoadingState {
  Idle = "Idle",
  LoadingStripe = "Loading",
  CheckOutSession = "Checking out",
  Redirecting = "Redirecting...",
  Error = "Error",
}

export function CheckoutForm() {
  // Toast
  const showToast = useShowToast();

  // Loading state
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Idle
  );
  const isLoading =
    loadingState !== LoadingState.Error && loadingState !== LoadingState.Idle;

  // Form state
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;

  const onFormSubmit = async (values: Inputs) => {
    const amount = APP_SUBSCRIPTION_COST;
    const { email, organization } = values;

    try {
      // Load Stripe
      setLoadingState(LoadingState.LoadingStripe);
      const redirectCallback = await loadInstance();
      if (!redirectCallback) {
        throw new Error("Failed to load stripe");
      }

      // Create a payment session
      setLoadingState(LoadingState.CheckOutSession);
      const checkoutSession = await axios.post(ENDPOINTS.checkoutSession, {
        amount,
        email,
        organization,
      });

      if (checkoutSession.status !== 200) {
        throw new Error("Failed to create a payment session");
      }

      // Redirect to checkout
      setLoadingState(LoadingState.Redirecting);
      const result = await redirectCallback(checkoutSession.data);

      if (result?.error) {
        throw new Error("Failed to redirect to checkout");
      }
    } catch (error: any) {
      console.log(error.response);
      showToast(ToastState.ERROR, error.response?.data || "Failed to checkout");
    } finally {
      setLoadingState(LoadingState.Idle);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col justify-center mt-6"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-60"
          />

          <Input
            {...register("organization", { required: true })}
            placeholder="Enter your organization name"
            className="w-full sm:w-60"
          />
        </div>

        {errors.email || errors.organization ? (
          <Alert variant="destructive" className="mb-3">
            Please fill in all the fields
          </Alert>
        ) : null}
        <p className="text-xs text-gray-500 text-start ml-0.5 mb-1">
          Credentials will be used to create an account for you.
        </p>
        <Button type="submit" variant={"default"} disabled={isLoading}>
          {isLoading ? <LoadState state={loadingState} /> : "Pay Now"}
        </Button>
      </form>
    </>
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
