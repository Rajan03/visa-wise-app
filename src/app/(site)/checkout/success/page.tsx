import { Button } from "@/components";
import { verifyStripeSession } from "@/config/stripe";
import { SessionServiceInstance } from "@/services";
import Link from "next/link";

type SuccessPageProps = {
  searchParams: { session_id: string };
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const stripeSession = await verifyStripeSession(searchParams.session_id);
  const sessionInDb = await SessionServiceInstance.getSession(
    searchParams.session_id
  );

  // If the payment was successful but session was not created in the database
  if (
    stripeSession &&
    stripeSession?.payment_status === "paid" &&
    !sessionInDb.data()
  ) {
    return (
      <PaidButError
        name={stripeSession.customer_details?.name as string}
        email={stripeSession.customer_details?.email as string}
      />
    );
  }

  // If the payment was successful and session was created in the database
  if (stripeSession.payment_status === "paid" && sessionInDb) {
    return <SuccessfulPayment />;
  }

  // If the payment was not successful or session was not created in the database
  throw new Error("Payment not successful");
}

function SuccessfulPayment() {
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
          <Link href={"/data"}>Continue to VisaWise Login</Link>
        </Button>
      </div>
    </div>
  );
}

// Todo: Handle raise a ticket action
function PaidButError({ email, name }: { email: string; name: string }) {
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
