import FirebaseClient from "@/config/firebase";
import { setCookie } from "@/lib";
import {
  Auth,
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from "firebase/auth";

class AuthService {
  private firebaseAuth: Auth;

  constructor() {
    const firebaseClient = new FirebaseClient();
    this.firebaseAuth = firebaseClient.getAuth();
  }

  // set cookie for token and refresh token listener
  public onTokenRefresh() {
    return this.firebaseAuth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie("token", token);
      } else {
        setCookie("token", "");
      }
    });
  }

  // SignIn using email and password
  public async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password
      );
      const idToken = await user.getIdToken();
      const claims = await user.getIdTokenResult();
      return {
        idToken,
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        claims: {
          domain: claims.claims.domain,
          role: claims.claims.role,
        },
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  // Get a user from firebase auth using client sdk with given domain custom claim
  public async signInWithToken(token: string) {
    try {
      const { user } = await signInWithCustomToken(this.firebaseAuth, token);

      const idToken = await user.getIdToken();
      const claims = await user.getIdTokenResult();
      return {
        idToken,
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        claims: {
          domain: claims.claims.domain,
          role: claims.claims.role,
        },
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export const AuthServiceInstance = Object.freeze(new AuthService());
