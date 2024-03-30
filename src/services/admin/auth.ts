import { fireAuthAdmin } from "@/config/firebase.admin";
import { AppRoles } from "@/types";
import type { Auth, UserRecord } from "firebase-admin/auth";

class AdminAuth {
  firebaseAuth: Auth;

  constructor() {
    this.firebaseAuth = fireAuthAdmin;
  }

  async createCustomToken(uid: string): Promise<string> {
    return this.firebaseAuth.createCustomToken(uid);
  }

  async createUser(
    email: string,
    password: string,
    domainId: string,
    role: AppRoles,
  ): Promise<UserRecord | null> {
    try {
      const userCredential = await this.firebaseAuth.createUser({
        email,
        password,
        emailVerified: false,
      });
      
      await this.firebaseAuth.setCustomUserClaims(userCredential.uid, {
        domain: domainId,
        role: role
      });
      return userCredential;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUser(uid: string) {
    return (await this.firebaseAuth.getUser(uid));
  }
}

export default Object.freeze(new AdminAuth());
