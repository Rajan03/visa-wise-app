import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image src="/logo.svg" alt="logo" width={36} height={36} />
      <h1 className="text-2xl font-bold font-mono text-nowrap text-gray-600">App</h1>
    </>
  );
}
