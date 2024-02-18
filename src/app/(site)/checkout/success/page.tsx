import { verifyStripeSession } from "@/config/stripe";
import { UserServiceInstance } from "@/services/admin";
import { PaidButError, SuccessfulPayment } from "../../_components";

type SuccessPageProps = {
  searchParams: { session_id: string };
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  // Verify Stripe seesion and get user
  const stripeSession = await verifyStripeSession(searchParams.session_id);
  const user = await UserServiceInstance.getUser(searchParams.session_id);

  // Customer Details
  const customer = stripeSession.customer_details as {
    email: string;
    name: string;
  };
  const paymenrPaid = stripeSession.payment_status === "paid";

  // If the payment was successful but user was not created in the database
  if (stripeSession && paymenrPaid && !user) {
    return (
      <PaidButError
        name={customer.name as string}
        email={customer.email as string}
      />
    );
  }

  // If the payment was successful and session was created in the database
  if (paymenrPaid && user) {
    const orgName = user.customClaims?.domain as string;
    return <SuccessfulPayment domain={orgName} userId={user.uid} />;
  }

  // If the payment was not successful or session was not created in the database
  throw new Error("Payment not successful");
}

