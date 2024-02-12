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
import { useShowToast, useSignUpModal, ToastState, useAuthUser } from "@/hooks";

export function SignUpDialog() {
  const { isOpen, toggle } = useSignUpModal();

  // IF modal is not open return Null
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get Started with VisaWise 🪄</DialogTitle>
          <DialogDescription>
            Get started with VisaWise by signing up directly with your email and
            password. We&apos;ll send you a link to verify your email address.
          </DialogDescription>
        </DialogHeader>

        <SignInForm onSubmit={() => toggle(false)} />
      </DialogContent>
    </Dialog>
  );
}

function SignInForm({ onSubmit }: { onSubmit: () => void }) {
  const showToast = useShowToast();
  const { signUp, login } = useAuthUser();

  // Form States
  const [loading, setLoading] = useState(false);
  const [btnTxt, setBtnTxt] = useState("Create Account");

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
      showToast(ToastState.ERROR, "Invalid Creadentials");
      return false;
    }

    return true;
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm()) return;

    setLoading(true);
    setBtnTxt("Creating...");
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    const user = await signUp({
      email,
      password,
      onError: (message) => {
        showToast(ToastState.ERROR, message);
        setLoading(false);
        setBtnTxt("Create Account");
      },
    });
    if (!user) return;

    const signedIn = await signInUser(email, password);

    if (signedIn) {
      onSubmit();
      setLoading(false);
    }
  };

  // Sign In user with email
  const signInUser = async (email: string, password: string) => {
    setBtnTxt("Signing in...");

    const session = await login({
      email,
      password,
      onError: (message) => showToast(ToastState.ERROR, message),
    });

    return session;
  };

  return (
    <>
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
          {btnTxt}
        </Button>
      </form>
    </>
  );
}
