import NextAuth, {DefaultSession} from "next-auth";
import { UserRecord } from "firebase-admin/auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    firebaseToken?: string;
    authUser?: UserRecord;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}