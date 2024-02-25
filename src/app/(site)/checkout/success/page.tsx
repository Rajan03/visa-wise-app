import { AuthServiceInstance } from "@/services/admin";
import { PaidButError, SuccessfulPayment } from "../../_components";

type SuccessPageProps = {
  searchParams: { session_id: string };
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {

  // Verify Stripe seesion and get user
  const verifiedSession = await AuthServiceInstance.verifyUserAndStripeSession(
    searchParams.session_id
  );

  // TODO: Custom Claims are not added instantly so we need to wait for a few seconds
  const { email, name, verified, domain } = verifiedSession;

  // If the payment was successful but user was not created in the database
  return verified ? (
    <SuccessfulPayment domain={domain as string} />
  ) : (
    <PaidButError name={name} email={email} />
  );
}
