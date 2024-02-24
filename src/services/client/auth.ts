import FirebaseClient from "@/config/firebase";
import { Auth, signInWithCustomToken } from "firebase/auth";

class AuthService {
  private firebaseAuth: Auth;

  constructor() {
    const firebaseClient = new FirebaseClient();
    this.firebaseAuth = firebaseClient.getAuth();
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
          role: claims.claims.role
        } 
       };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export const AuthServiceInstance = Object.freeze(new AuthService());
