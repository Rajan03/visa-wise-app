import { auth } from "@/config/firebase.client";
import { signInWithCustomToken, type Auth, type UserCredential } from "firebase/auth";

class ClientAuth {
  firebaseAuth: Auth;

  constructor() {
    this.firebaseAuth = auth;
  }

  async signInWithToken(token: string): Promise<UserCredential> {
    return await signInWithCustomToken(this.firebaseAuth, token);
  }
}

export const clientAuth = Object.freeze(new ClientAuth());
