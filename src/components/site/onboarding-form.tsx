import { Button, Input, Label } from "@/components//ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastState, useShowToast } from "@/hooks";
import { IDomain, domainValidation } from "@/types";
import { DomainService } from "@/services";
import { useRouter } from "next/router";

type OnboardingInputs = Omit<IDomain, "config">;
type Props = {};

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

const formValidator = {
  resolver: yupResolver(domainValidation),
  values: obj,
};
export function OnboardingForm({}: Props) {
  const router = useRouter();
  const showToast = useShowToast();

  // FORM Helpers
  const hookForm = useForm<OnboardingInputs>(formValidator);
  const { register, handleSubmit, formState } = hookForm;
  const { errors, isSubmitting } = formState;

  // On Form Submit
  const onSubmit = async (data: OnboardingInputs) => {
    try {
      const domain = await DomainService.createDomain(data);
      await router.replace(`/${domain}`).then(() => {
        showToast(ToastState.SUCCESS, `Domain ${domain} created successfully`);
      });
    } catch (error: any) {
      console.log("Error creating domain: ", error);
      
      showToast(ToastState.ERROR, error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-6 w-full py-10"
      >
        {/* ORG DETAILS */}
        <SectionHeading
          title="Organization Details"
          description="Please provide the following details about your organization."
        />

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
        <SectionHeading
          title="Owner Info"
          description="Please provide the following details about your organization."
        />

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
        <SectionHeading
          title="Point of contact"
          description="Please provide the following details about your organization."
        />

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
        <SectionHeading
          title="Tax Information"
          description="Please provide the following details about your organization."
        />

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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Organization..." : "Create Organization"}
          </Button>
        </div>
      </form>
    </>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="col-span-3 border-l-4 pl-4 border-primary mt-8">
      <h3 className="text-md font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
