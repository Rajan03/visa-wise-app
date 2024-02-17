"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Each, Logo } from "@/components";
import { INavLink } from "@/types";
import { navOptions as options, cn } from "@/lib";

export function AppNavigation() {
  return (
    <>
      <nav className="bg-white text- relative shadow-md flex justify-between">
        <div className="py-4 px-8 flex justify-start items-center gap-x-3 cursor-pointer">
          <Logo />
        </div>

        <div className="p-4 flex gap-x-1">
          <Each of={options} render={(item) => <SidebarItem {...item} />} />
        </div>
      </nav>
    </>
  );
}

function SidebarItem(props: INavLink) {
  const { subDomain } = useParams();
  const isActive = window?.location?.pathname === `/${subDomain}${props.href}`;

  const txtStyle = cn(
    isActive
      ? "text-primary-600 hover:text-primary-700"
      : "text-gray-500 hover:text-gray-900",
    "transition-colors duration-300",
    "text-md flex justify-center items-center gap-x-2 px-4 py-2 rounded-md cursor-pointer"
  );

  return (
    <Link href={subDomain + props.href} className={txtStyle}>
      {props.value}
      <span className="leading-tight">{props.label}</span>
    </Link>
  );
}
