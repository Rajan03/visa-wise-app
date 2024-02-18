import { FirebaseAdmin } from "@/config/firebase.admin";
import { Auth } from "firebase-admin/auth";

class AuthenticationService {
  private firebaseAuth: Auth;

  constructor() {
    const firebaseAdmin = new FirebaseAdmin();
    this.firebaseAuth = firebaseAdmin.getAuth();
  }

  // Generate a IdToken for a user using admin sdk with given uid
  async generateIdToken(uid: string) {
    try {
      const idToken = await this.firebaseAuth.createCustomToken(uid);
      const verifiedIdToken = await this.firebaseAuth.verifyIdToken(idToken);
      return verifiedIdToken;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const authServiceInstance = Object.freeze(new AuthenticationService());