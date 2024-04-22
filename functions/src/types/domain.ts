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
  ownerId?: string;
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

  // Onboarding
  onboarding: boolean;

  // Payment
  session_id?: string;
}
