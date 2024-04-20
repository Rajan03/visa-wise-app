import { AppRoles } from "./app";

export interface DomainUser {
  email: string;
  displayName: string;
  role: AppRoles;
  createdAt: Date;
}

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  domains: DomainInfo[];
  createdAt: Date;
}

export interface DomainInfo {
  id: string;
  role: AppRoles;
}