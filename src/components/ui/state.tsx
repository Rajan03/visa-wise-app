import { Logo } from "../site";

export function Loading() {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-y-1.5">
          <Logo />
          <div className="animate-ping bg-primary w-28 h-1 rounded-full" />
        </div>
      </div>
    );
}

export function Error({error}: {error?: string}) {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{error || "Something went wrong!"}</h1>
          <p className="text-sm text-gray-500">
            Please try again later or contact support.
          </p>
        </div>
      </div>
    </>
  );
}