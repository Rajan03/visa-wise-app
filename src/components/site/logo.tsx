import { Pacifico } from "next/font/google";
import Link from "next/link";

const font = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
});

export function Logo() {
    return (
      <Link href={`/`} className={`${font.className} text-2xl`}>
        visa<span className="text-primary">wise</span>
      </Link>
    );
}