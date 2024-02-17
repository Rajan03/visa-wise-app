"use client";

import { Button } from "@/components";
import Image from "next/image";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
};

export default function ErrorPage({ error }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Image
          src="/shape.svg"
          width={200}
          height={200}
          alt="shape"
          className="absolute right-0 top-0 h-full object-cover w-auto -z-1 opacity-15"
        />

        <div className="z-10 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-700 text-center mb-4">
            Looks like something went wrong. Please try again. If the problem
            persists, please contact support.
            <br />
            <br />
            ERROR: {error.message}
          </p>

          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
