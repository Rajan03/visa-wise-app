import * as yup from "yup";

export interface IDomain {
  // Org dettails
  id?: string;
  orgName: string;
  domainName: string;
  orgLogo?: string;

  // Org address
  address: string;
  city: string;
  country: string;

  // Owner Info
  ownerName: string;
  ownerEmail: string;

  // Contact Info
  contactEmail: string;
  contactName: string;

  // Tax info
  brn?: string;
  tin?: string;

  config?: IDomainConfig; 
}

export interface IDomainConfig {
  logo: string;
  favicon: string;

  // Theme
  theme: string;

  // Social
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export const domainValidation = yup.object().shape({
  orgName: yup.string().required("Organization name is required"),
  domainName: yup.string().required("Domain name is required"),
  orgLogo: yup.string(),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  ownerName: yup.string().required("Owner name is required"),
  ownerEmail: yup.string().email().required("Owner email is required"),
  contactEmail: yup.string().email().required("Contact email is required"),
  contactName: yup.string().required("Contact name is required"),
  brn: yup.string(),
  tin: yup.string()
});