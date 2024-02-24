import { Button, SignInAction } from "@/components";
import { WithParams } from "@/types";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import Link from "next/link";

export default function DomainLanding({ params: { subDomain } }: WithParams) {
  // Check if user is authenticated
  const cookieStore = cookies();
  const auth = cookieStore.get("token")?.value;

  return (
    <>
      <div className="flex-1 max-w-3xl mx-auto space-y-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-center">
          Your Clients, Documents, & Team. Unified. Welcome to{" "}
          <span className="underline">{subDomain}</span>
        </h1>
        <h3 className="text-base sm:text-xl font-medium text-center">
          {subDomain} is the platform that streamlines and simplifies <br />
          the visa application process for individuals and businesses.
        </h3>
        <div className="flex gap-x-2">
          {auth ? (
            <Button asChild>
              <Link href={`/${subDomain}/dashboard`}>
                Go to Dashboard
              </Link>
            </Button>
          ) : (
            <SignInAction>
              <Button>
                <span>Sign In</span>
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </SignInAction>
          )}
        </div>
      </div>
    </>
  );
}
