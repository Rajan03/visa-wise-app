import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image src="/logo.svg" alt="logo" width={36} height={36} className="grayscale"/>
    </>
  );
}
