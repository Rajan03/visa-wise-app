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
  const { email, name, token } = verifiedSession;

  // If the payment was successful but user was not created in the database
  if (token) {
    return <SuccessfulPayment userToken={token} />;
  } else {
    return <PaidButError name={name as string} email={email as string} />;
  }
}
