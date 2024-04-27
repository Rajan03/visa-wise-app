export interface IEnquiry {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone?: string;
  dob: string;
  gender: string;
  country: string;
  nationality: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;

  migrateToCountry: string;
  migrateToCity?: string;
  visaType: string; // TODO: Change to enum
  message: string;
  status: EnquiryStatus;
  source: string; // TODO: Change to enum

  citizenship: string;
  currentVisaType: string; // TODO: Change to enum
  currentVisaExpiry: string;
  education: {
    degree: string;
    major: string;
    institution: string;
    year: string;
  }[];
  workExperience: {
    jobTitle: string;
    company: string;
    start: string;
    end?: string;
    isCurrent: boolean;
  }[];
  englishProficiency: {
    test: string;
    score?: string;
    date: string;
    scoreDivision?: {
      listening: string;
      reading: string;
      writing: string;
      speaking: string;
    };
    isResultAvailable: boolean;
  }[];

  assignedTo?: string; // TODO: Change to team member
  createdAt: string;
  updatedAt: string;
}

export enum EnquiryStatus {
    NEW = 'New',
    IN_PROGRESS = 'In Progress',
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
    CLOSED = 'Closed',
}

export enum EnquirySource {
    WEBSITE = 'WEBSITE',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    REFERRAL = 'REFERRAL',
}