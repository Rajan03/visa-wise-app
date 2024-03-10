"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Button,
  Alert,
} from "@/components";
import { useSignInModal } from "@/hooks";

type Inputs = {
  email: string;
};

// TODO: Improve UI and white label it
export function SignInDialog() {
  const { isOpen, toggle } = useSignInModal();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSignIn = async (data: Inputs) => {
    const { email } = data;
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      {/* FORM */}
      <DialogContent>
        <form onSubmit={handleSubmit(handleSignIn)}>
          {/* HEADER */}
          <DialogHeader>
            <DialogTitle>Hey, Welcome to VisaWise!</DialogTitle>
            <DialogDescription>
              Please provide your email to continue to VisaWise
            </DialogDescription>
          </DialogHeader>

          {/* FORM */}
          <div className="flex flex-col mt-6 mb-3">
            {/* API ERROR */}
            {error && (
              <Alert variant={"destructive"} className="mb-2">
                {error}
              </Alert>
            )}

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
              <Input
                {...register("email", { required: true })}
                className="col-span-3"
                placeholder="Enter your email"
                color={errors.email ? "danger" : "primary"}
              />
            </div>

            {/* FORM ERROR */}
            <div className="text-red-500 text-sm">
              {errors.email && "Email is required"}
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter>
            <Button className="w-full flex justify-center" type="submit">
              Send Verification Link
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SignInAction({ children }: React.PropsWithChildren<{}>) {
  const { toggle } = useSignInModal();

  return <div onClick={() => toggle(true)}>{children}</div>;
}
