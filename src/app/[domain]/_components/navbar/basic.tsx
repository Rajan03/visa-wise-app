"use client";

import { Button, Each } from "@/components";
import { useSignInModal } from "@/hooks";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Kavoon } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";

const font = Kavoon({
  weight: ["400"],
  subsets: ["latin"],
});

type NavProps = {
  links: { name: string; to: string }[];
};

export function BasicNavbar({ links }: NavProps) {
  const session = useSession();
  const paramss = useParams();
  const { toggle } = useSignInModal();
  const {setTheme, forcedTheme} = useTheme();

  const isAuth = !!session.data?.firebaseToken;
  const domain = paramss.domain;

  
  return (
    <div className="container flex justify-between items-center">
      {/* Logo */}
      <Link href={`/${domain}`} className={`${font.className} text-xl`}>
        visa<span className="text-primary">wise</span>
      </Link>

      <Button onClick={() => setTheme("green-light")}>G</Button>
      <Button onClick={() => setTheme("orange-dark")}>O</Button>

      {/* Nav links */}
      <ul className="flex items-center gap-x-8">
        <Each
          of={links}
          render={(link) => (
            <li
              className={`text-sm text-foreground font-semibold hover:text-primary`}
            >
              <Link href={`/${domain}${link.to}`}>{link.name}</Link>
            </li>
          )}
        />

        {/* Auth buttons */}
        <li className={`text-sm text-primary font-bold hover:text-primary/50`}>
          {isAuth ? (
            <Link href={`/${domain}/dashboard`}>Dashboard</Link>
          ) : (
            <button onClick={() => toggle(true)}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
}
