import { Button } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default async function CancelPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Image
        src="/shape.svg"
        width={200}
        height={200}
        alt="shape"
        className="absolute right-0 top-0 h-full object-cover w-auto -z-1 opacity-15"
      />

      <div className="z-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-700 mb-4">
          Payment was unsuccessful. Please try again.
        </p>
        <Button asChild>
          <Link href="/checkout">Retry</Link>
        </Button>
      </div>
    </div>
  );
}
