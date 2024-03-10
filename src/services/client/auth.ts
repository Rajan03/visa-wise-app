import { auth } from "@/config/firebase.client";
import { signInWithCustomToken, type Auth, type UserCredential, sendSignInLinkToEmail } from "firebase/auth";

class ClientAuth {
  firebaseAuth: Auth;

  constructor() {
    this.firebaseAuth = auth;
  }

  async signInWithToken(token: string): Promise<UserCredential> {
    return await signInWithCustomToken(this.firebaseAuth, token);
  }

  async signInLink(email: string) {
    await sendSignInLinkToEmail(this.firebaseAuth, email, {
      url: "http://localhost:3000/auth/verify",
      handleCodeInApp: true,
    });
  }
}

export const clientAuth = Object.freeze(new ClientAuth());
