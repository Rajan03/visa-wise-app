import { env } from "@/env";
import { loadStripe } from "@stripe/stripe-js";
import { type Stripe } from "@stripe/stripe-js";
import StripeInstance from "stripe";

export type StripeSession = StripeInstance.Response<StripeInstance.Checkout.Session>;
export const stripe = new StripeInstance(env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2024-04-10",
});

export const loadStripeInstance = async () => {
  try {
    const stripe = await loadStripe(env.STRIPE_PUBLISHABLE_KEY);
    return stripe;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyStripeSession = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const redirectToCheckout = async (sessionId: string, stripe: Stripe | null) => {
  if (!stripe) {
    throw new Error("Failed to load stripe");
  }
  console.log("Session ID: ", sessionId);

  try {
    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      throw new Error("Failed to redirect to checkout");
    }
  } catch (error: any) {
    return { error };
  }
};

export const loadInstance = async () => {
  try {
    const stripe = await loadStripe(env.STRIPE_PUBLISHABLE_KEY);
    if (!stripe) {
      throw new Error("Failed to load stripe");
    }

    return (session: string) => redirectToCheckout(session, stripe);
  } catch (error) {
    console.log(error);
    return null;
  }
};
