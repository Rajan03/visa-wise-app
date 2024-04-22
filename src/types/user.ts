import { User } from "firebase/auth";
import { AppRoles } from "./app";


export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: AppRoles;
  domain: DomainInfo;
  photoURL: string;
  createAt: string;
}

export interface DomainInfo {
  id: string;
  role: AppRoles;
}

export interface AuthUser extends User {
  role: string;
  domain: string;
}