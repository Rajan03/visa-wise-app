"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Button,
} from "@/components";
import { ToastState, useShowToast, useSignInModal } from "@/hooks";
import { setCookie } from "@/lib";
import { AuthServiceInstance } from "@/services/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

// TODO: Improve UI and white label it
export function SignInDialog() {
  const router = useRouter();
  const { isOpen, toggle } = useSignInModal();
  const showToast = useShowToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSignIn = async (data: Inputs) => {
    const { email, password } = data;

    try {
      const user = await AuthServiceInstance.signIn({ email, password });
      console.log({ user });
      setCookieAndRedirect(user.idToken as string)
        .then(() => {
          toggle(false);
          showToast(ToastState.SUCCESS, "Logged in successfully");
          router.push(`/${user.claims.domain}/dashboard`);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error: any) {
      showToast(ToastState.ERROR, error.message);
    }
  };

  const setCookieAndRedirect = (token: string) => {
    return new Promise((resolve) => {
      setCookie("token", token);
      resolve(true);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      {/* FORM */}
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="sm:max-w-[425px]"
        >
          {/* HEADER */}
          <DialogHeader>
            <DialogTitle>Hey, Welcome Back!</DialogTitle>
            <DialogDescription>
              Sign in to your account to continue using VisaWise
            </DialogDescription>
          </DialogHeader>

          {/* FORM */}
          <div className="flex flex-col gap-3 mt-8 mb-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-left text-gray-500">
                Email
              </Label>
              <Input
                {...register("email", { required: true })}
                className="col-span-3"
                placeholder="eg. example@visawise.com"
                color={errors.email ? "danger" : "primary"}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-left text-gray-500">
                Password
              </Label>
              <Input
                {...register("password", { required: true })}
                type="password"
                placeholder="********"
                className="col-span-3"
              />
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter>
            {/* ERROR */}
            <div className="text-red-500 text-sm">
              {errors.email && "Email is required"}
              {errors.password && "Password is required"}
            </div>

            <Button className="self-start" type="submit">
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SignInAction({ children }: React.PropsWithChildren<{}>) {
  const { toggle } = useSignInModal();

  return (
    <div onClick={() => toggle(true)}>
      {children}
    </div>
  );
}