"use client";
import { Button, Input, Label } from "@/components";
import { IDomain, domainValidation } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DomainClient } from "@/services/client";
import { ToastState, useShowToast } from "@/hooks";
import { useRouter } from "next/navigation";

type OnboardingInputs = IDomain;
const obj = {
  orgName: "VisaWise",
  domainName: "visawise",
  address: "123 Main street, Mohali",
  city: "Mohali",
  country: "India",
  ownerName: "Rajan Verma",
  ownerEmail: "rajan@yopmail.com",
  contactName: "Rajan",
  contactEmail: "rajan@yopmail.com",
  brn: "134567",
  tin: "34567",
};

export function OnboardingForm() {
  const router = useRouter();
  const showToast = useShowToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingInputs>({
    resolver: yupResolver(domainValidation),
    values: obj,
  });

  const onSubmit = async (data: OnboardingInputs) => {
    try {
      const domain = await DomainClient.createDomain(data);
      Promise.resolve(
        showToast(ToastState.SUCCESS, `Organization ${domain} Created!`)
      ).then(() => router.replace(`/${domain}/dashboard`));
    } catch (error: any) {
      showToast(ToastState.ERROR, error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4 w-full py-10"
      >
        {/* ORG DETAILS */}
        <div className="col-span-3">
          <h3 className="text-md font-bold">Organization Details</h3>
          <p className="text-sm text-gray-500">
            Please provide the following details about your organization.
          </p>
        </div>

        {/* Row 1 - ORG Name, Domain, Logo */}
        <>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input
              {...register("orgName")}
              error={!!errors.orgName}
              id="org-name"
              type="text"
              placeholder="eg. Digital Dreams"
            />
          </div>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="domain-name">Preferred Domain Name</Label>
            <Input
              {...register("domainName")}
              error={!!errors.domainName}
              id="domain-name"
              type="text"
              placeholder="eg. digitaldreams.com"
            />
          </div>
          <div />
        </>

        {/* Row 2 - Address, City, Country */}
        <>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input
              {...register("address")}
              error={!!errors.address}
              id="address"
              type="text"
              placeholder="eg. 1234 Main St, City, State, Zip Code"
            />
          </div>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="city">City</Label>
            <Input
              {...register("city")}
              error={!!errors.city}
              id="city"
              type="text"
              placeholder="eg. New York"
            />
          </div>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="country">Country</Label>
            <Input
              {...register("country")}
              error={!!errors.country}
              id="country"
              type="text"
              placeholder="eg. New York"
            />
          </div>
        </>

        {/* OWNER CONTACT */}
        <div className="col-span-3 mt-8">
          <h3 className="text-md font-bold">Owner Info</h3>
          <p className="text-sm text-gray-500">
            Please provide the following details about your organization.
          </p>
        </div>

        {/* Row 3 - Name, Email */}
        <>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input
              {...register("ownerName")}
              error={!!errors.ownerName}
              id="ownerName"
              type="text"
              placeholder="eg. Jon Snow"
            />
          </div>

          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="ownerEmail">Owner Email</Label>
            <Input
              {...register("ownerEmail")}
              error={!!errors.ownerEmail}
              id="ownerEmail"
              type="email"
              placeholder="eg. example@gmail.com"
            />
          </div>
        </>

        {/* POINT OF CONTACT */}
        <div className="col-span-3 mt-8">
          <h3 className="text-md font-bold">Point of contact</h3>
          <p className="text-sm text-gray-500">
            Please provide the following details about your organization.
          </p>
        </div>

        {/* Row 4 - Name, Email */}
        <>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              {...register("contactName")}
              error={!!errors.contactName}
              id="contactName"
              type="text"
              placeholder="eg. New York"
            />
          </div>

          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              {...register("contactEmail")}
              error={!!errors.contactEmail}
              id="contactEmail"
              type="email"
              placeholder="eg. example@gmail.com"
            />
          </div>
        </>

        {/* Tax Info */}
        <div className="col-span-3 mt-8">
          <h3 className="text-md font-bold">Tax Information</h3>
          <p className="text-sm text-gray-500">
            Please provide the following details about your organization.
          </p>
        </div>

        {/* Row 5 - BRN, TIN */}
        <>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="brn">Business Registration Number</Label>
            <Input
              {...register("brn")}
              error={!!errors.brn}
              id="brn"
              type="text"
              placeholder="eg. 1234567890"
            />
          </div>
          <div className="flex flex-col w-full space-y-1">
            <Label htmlFor="tin">Tax Identification Number</Label>
            <Input
              {...register("tin")}
              error={!!errors.tin}
              id="tin"
              type="text"
              placeholder="eg. New York"
            />
          </div>
        </>

        {/* Submit */}
        <div className="col-span-3 mt-8">
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </>
  );
}
