import { auth } from "@/config/firebase.client";
import { AppRoles } from "@/types";
import {
  type Auth,
  type UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

class ClientAuth {
  firebaseAuth: Auth;

  constructor() {
    this.firebaseAuth = auth;
  }

  async signInUser(email: string, pasword: string) {
    try {
      return await signInWithEmailAndPassword(
        this.firebaseAuth,
        email,
        pasword
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const AuthClient = Object.freeze(new ClientAuth());
