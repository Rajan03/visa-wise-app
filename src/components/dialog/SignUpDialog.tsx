"use client";
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
import AppWrite from "@/config/appwrite";
import { useShowToast, useSignUpModal, ToastState } from "@/hooks";
import { useAuthUser } from "@/hooks/use-auth-user";
import { CallState } from "@/types";
import { useRef, useState } from "react";

export function SignUpDialog() {
  const { isOpen, toggle } = useSignUpModal();
  const { setUser } = useAuthUser();
  const showToast = useShowToast();

  // Form States
  const [state, setState] = useState(CallState.Idle);
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
      email.length > 320
    ) {
      showToast(ToastState.ERROR, "Invalid email addess");
      return false;
    }

    if (!password || password.length < 6) {
      showToast(ToastState.ERROR, "Invalid password");
      return false;
    }
    return true;
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm()) return;

    setState(CallState.Loading);
    setBtnTxt("Creating...");
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    const user = await AppWrite.SignUpUser(
      email as string,
      password as string,
      (message) => {
        showToast(ToastState.ERROR, message);
        setState(CallState.Error);
        setBtnTxt("Create Account");
      }
    );
    if (!user) return;

    await signInUser(email, password);
    toggle(false);
    setState(CallState.Idle);
  };

  // Sign In user with email
  const signInUser = async (email: string, password: string) => {
    setBtnTxt("Signing in...");

    const user = await AppWrite.SignInUser(email, password, (message) =>
      showToast(ToastState.ERROR, message)
    );

    if (user) {
      setUser(user);
    }
  };

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
            {btnTxt}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
