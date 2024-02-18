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
      return idToken;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Verifies id token for user
  async verifyIdToken(token: string) {
    try {
      const decoded = await this.firebaseAuth.verifyIdToken(token);
      return decoded;
    } catch (error: any) {
      console.log("VERIFY ID TOKEN: ", error);
      
      throw new Error(error.message);
    }
  }
}

export const AuthServiceInstance = Object.freeze(new AuthenticationService());