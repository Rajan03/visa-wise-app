"use client";
import { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@/components";
import { useSignInModal, useShowToast, ToastState, useAuthUser } from "@/hooks";

export function SignInDialog() {
  const { isOpen, toggle } = useSignInModal();

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

        <SignInForm onSubmit={() => toggle(false)} />
      </DialogContent>
    </Dialog>
  );
}

function SignInForm({ onSubmit }: { onSubmit: () => void }) {
  const showToast = useShowToast();
  const { login } = useAuthUser();

  // Form States
  const [loading, setLoading] = useState(false);

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
      showToast(ToastState.ERROR, "Invalid Credentials!");
      return false;
    }
    return true;
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm()) return;

    setLoading(true);
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    const session = await login({
      email,
      password,
      onError: (message) => showToast(ToastState.ERROR, message),
    });

    if (session) onSubmit();
    setLoading(false);
  };

  return (
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

      <Button type="submit" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
