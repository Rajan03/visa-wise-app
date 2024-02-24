import { FirebaseAdmin } from "@/config/firebase.admin";
import { verifyStripeSession } from "@/config/stripe";
import { Auth } from "firebase-admin/auth";

type UserWithClaims = {
  name: string;
  email: string;
  verified: boolean;
  domain?: string;
  role?: string;
};
class AuthenticationService {
  private firebaseAuth: Auth;

  constructor() {
    const firebaseAdmin = new FirebaseAdmin();
    this.firebaseAuth = firebaseAdmin.getAuth();
  }

  // Generate a IdToken for a user using admin sdk with given uid
  async generateCustomToken(uid: string) {
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

  // Verifies user and stripe session and returns user details
  async verifyUserAndStripeSession(sessionId: string): Promise<UserWithClaims> {
    try {
      const stripeSession = await verifyStripeSession(sessionId);
      if (!stripeSession) {
        throw new Error("Stripe session not found");
      }

      const user = await this.firebaseAuth.getUser(sessionId);
      if (!user) {
        return {
          name: stripeSession.customer_details?.name as string,
          email: stripeSession.customer_details?.email as string,
          verified: false,
        };
      }

      return {
        name: user.displayName as string,
        email: user.email as string,
        verified: true,
        ...user.customClaims,
      };
    } catch (error: any) {
      console.log("VERIFY USER AND STRIPE SESSION: ", error);
      throw new Error(error.message);
    }
  }
}

export const AuthServiceInstance = Object.freeze(new AuthenticationService());
