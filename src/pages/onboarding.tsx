import { OnboardingForm } from "@/components/site";
import { useDoc } from "@/hooks";
import { verifyStripeSession } from "@/lib/stripe";
import { IDomain } from "@/types";
import { GetServerSidePropsContext } from "next";

// Types
type OnboardingPageProps = {
  domain: string;
};

// TODO: Implement the subscription plan part maybe using webhook or manually handle it.
// Component
export default function OnboardingPage({ domain }: OnboardingPageProps) {
  const [domainDoc, loading, error] = useDoc(`domains/${domain}`);

  // Loading and error states
  if (loading) return <Loading />;
  if (error || !domainDoc || !domainDoc.exists()) return <NoSession />;

  // Domain data
  const domainData = domainDoc.data() as IDomain;
  if (domainData.config?.onboarding) return <OnboardingCompleted />;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 pt-16 container">
      {/* Header */}
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-bold">Welcome to VisaWise! 🎉</h1>
        <p className="text-sm text-center text-gray-500">
          We&apos;re excited to help you get started on your journey. Please
          fill out the form below to get started.
        </p>
      </div>

      {/* Form */}
      <OnboardingForm domain={domainData} />
    </div>
  );
}

// Server-side code
// TODO:  Send User an email with the session ID to continue onboarding or contact support
const notFound = { notFound: true };
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  if (!query?.session_id) return notFound;

  try {
    // Verify stripe session
    const id = query.session_id as string;
    const verifiedSession = await verifyStripeSession(id);

    // If session exists, add doc or get doc for org
    if (verifiedSession) {
      return {props: {domain: verifiedSession.metadata!.domain}}
    }

    return notFound;
  } catch (error) {
    return { props: notFound };
  }
}

// No session found
function NoSession() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 pt-16 container">
      <h1 className="text-2xl font-bold">Session not found</h1>
      <p className="text-sm text-center text-gray-500">
        We couldn&apos;t find the session you were looking for. Please try
        again.
      </p>
    </div>
  );
}

// Loading state
function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 pt-16 container">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );
}

// Onboarding already completed
function OnboardingCompleted() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 pt-16 container">
      <h1 className="text-2xl font-bold">Onboarding Completed</h1>
      <p className="text-sm text-center text-gray-500">
        You have already completed the onboarding process. If you need help,
        please contact support.
      </p>
    </div>
  );
}