"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AuthService from "@/services/auth";
import { Button, Logo } from "@/components";
import { ToastState, useShowToast, useScrollTop } from "@/hooks";
import { useSession } from "next-auth/react";

export function Navbar() {
  const scrolled = useScrollTop();
  const showToast = useShowToast();
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const createAccount = async () => {
    try {
      setLoading(true);
      const res = await AuthService.login();
      res?.ok && setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(ToastState.ERROR, "Error logging in");
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      showToast(ToastState.SUCCESS, "Logged out successfully");
    } catch (error) {
      showToast(ToastState.ERROR, "Error logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] h-20 fixed top-0 flex items-center w-full px-6 py-4 shadow",
        scrolled && "border-b shadow-md transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex items-center gap-x-4">
        <Logo />
        <h1 className="text-xl font-bold">VisaWise</h1>
      </div>

      <div className="md:ml-auto flex items-center gap-x-8">
        <a href="/features" className="hidden md:block hover:underline">
          Features
        </a>
        <a href="/pricing" className="hidden md:block hover:underline">
          Pricing
        </a>
        <a href="/contact" className="hidden md:block hover:underline">
          Contact
        </a>

        {session.data ? (
          <Button onClick={logout} disabled={loading}>
            {loading ? "Loading..." : "Logout"}
          </Button>
        ) : (
          <Button onClick={createAccount} disabled={loading}>
            {loading ? "Loading..." : "Create Account"}
          </Button>
        )}
      </div>
    </div>
  );
}
