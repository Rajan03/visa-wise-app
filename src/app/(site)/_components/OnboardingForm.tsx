'use client';
import { Button, Input, Label } from "@/components";
import { useForm } from "react-hook-form";

type OnboardingInputs = {
    orgName: string;
    domainName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    brn: string;
    tin: string;
}
export function OnboardingForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<OnboardingInputs>(); 
    const onSubmit = (data: OnboardingInputs) => console.log(data);
    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-4 w-full pt-10"
        >
          <div className="col-span-3">
            <h3 className="text-md font-bold">Organization Details</h3>
            <p className="text-sm text-gray-500">
              Please provide the following details about your organization.
            </p>
          </div>

          {/* Row 1 */}
          <>
            <div className="flex flex-col w-full space-y-1 mt-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                {...register("orgName", { required: true })}
                color={errors.orgName ? "danger" : "primary"}
                id="org-name"
                type="text"
                placeholder="eg. Digital Dreams"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <Label htmlFor="domain-name">Preferred Domain Name</Label>
              <Input
                {...register("domainName", { required: true })}
                color={errors.domainName ? "danger" : "primary"}
                id="domain-name"
                type="text"
                placeholder="eg. digitaldreams.com"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                {...register("email", { required: true })}
                color={errors.email ? "danger" : "primary"}
                id="email"
                type="email"
                placeholder="example@digitaldreams.com"
              />
            </div>
          </>

          {/* Row 2 */}
          <>
            <div className="flex flex-col w-full space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input
                {...register("address", { required: true })}
                color={errors.address ? "danger" : "primary"}
                id="address"
                type="text"
                placeholder="eg. 1234 Main St, City, State, Zip Code"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <Label htmlFor="city">City</Label>
              <Input
                {...register("city", { required: true })}
                color={errors.city ? "danger" : "primary"}
                id="city"
                type="text"
                placeholder="eg. New York"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <Label htmlFor="country">Country</Label>
              <Input
                {...register("country", { required: true })}
                color={errors.country ? "danger" : "primary"}
                id="country"
                type="text"
                placeholder="eg. New York"
              />
            </div>
          </>

          <div className="col-span-3 mt-8">
            <h3 className="text-md font-bold">Tax Information</h3>
            <p className="text-sm text-gray-500">
              Please provide the following details about your organization.
            </p>
          </div>

          {/* Row 3 */}
          <>
            <div className="flex flex-col w-full space-y-1">
              <Label htmlFor="brn">Business Registration Number</Label>
              <Input
                {...register("brn", { required: true })}
                color={errors.brn ? "danger" : "primary"}
                id="brn"
                type="text"
                placeholder="eg. 1234567890"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <Label htmlFor="tin">Tax Identification Number</Label>
              <Input
                {...register("tin", { required: true })}
                color={errors.tin ? "danger" : "primary"}
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