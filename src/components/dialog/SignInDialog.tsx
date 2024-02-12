"use client";
import { Label } from "@/components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/components";
import AppWriteService from "@/config/appwrite";
import { useSignInModal, useShowToast, ToastState } from "@/hooks";
import { useAuthUser } from "@/hooks/use-auth-user";
import { CallState } from "@/types";
import { useRef, useState } from "react";

export function SignInDialog() {
  const { isOpen, toggle } = useSignInModal();
  const { setUser } = useAuthUser();
  const showToast = useShowToast();

  // Form States
  const [state, setState] = useState(CallState.Idle);

  // Form Refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Validate form
  const isValidForm = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (
      !email ||
      !email.includes("@") ||
      !email.includes(".") ||
      email.length < 5 ||
      email.length > 320 ||
      !password ||
      password.length < 6
    ) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm()) return;

    setState(CallState.Loading);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const user = await AppWriteService.SignInUser(
      email as string,
      password as string,
      (message) => showToast(ToastState.ERROR, message)
    );

    if (user) {
      setUser(user);
      toggle(false);
    }
    setState(CallState.Idle);
  };

  // If modal is not open return null
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get Started with VisaWise 🪄</DialogTitle>
          <DialogDescription>
            Get started with VisaWise by signing in directly with your email and
            password. We&apos;ll send you a link to verify your sign in.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input required type="email" placeholder="Email" ref={emailRef} />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              required
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>

          <Button type="submit" disabled={state === CallState.Loading}>
            {state === CallState.Loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
