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
import { useDomain, useSignInModal } from "@/hooks";

type Inputs = {
  email: string;
  password: string;
};

// TODO: Improve UI and white label it
export function SignInDialog() {
  const { isOpen, toggle } = useSignInModal();
  const {domain} = useDomain();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSignIn = async (data: Inputs) => {
    const { email, password } = data;
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSignIn)}>
          {/* HEADER */}
          <DialogHeader>
            <DialogTitle>Hey, Welcome to {domain?.orgName}!</DialogTitle>
            <DialogDescription>
              Please provide your email to continue to {domain?.orgName}
            </DialogDescription>
          </DialogHeader>

          {/* FORM */}
          <div className="flex flex-col gap-2 mt-6 mb-3">
            {/* EMAIL */}
            <div className="flex flex-col">
              <Label>Email</Label>
              <Input
                {...register("email", { required: true })}
                className={`col-span-3 mt-1 mb-0.5 ${
                  errors.email ? "focus-visible:ring-red-400" : ""
                }`}
                placeholder="example@example.com"
              />
              <div className="text-red-500 text-[10px]">
                {errors.email && "Email is required"}
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col">
              <Label>Password</Label>
              <Input
                {...register("password", { required: true })}
                type="password"
                className={`col-span-3 mt-1 mb-0.5 ${
                  errors.password ? "focus-visible:ring-red-400" : ""
                }`}
                placeholder="***********"
              />
              <div className="text-red-500 text-[10px]">
                {errors.password && "Password is required"}
              </div>
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
