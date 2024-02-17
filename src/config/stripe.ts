import { env } from "@/env";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2023-10-16",
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
