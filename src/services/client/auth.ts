import FirebaseClient from "@/config/firebase.client";
import { Auth, User, signInWithEmailAndPassword } from "firebase/auth";

type SignInProps = {
  email: string;
  password: string;
};

class AuthService {
  private firebaseAuth: Auth;

  constructor() {
    const firebaseClient = new FirebaseClient();
    this.firebaseAuth = firebaseClient.getAuth();
  }

  // SignIn using email and password
  public async signIn({ email, password }: SignInProps) {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password
      );
      return user;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  // Get Current logged in user
  public getCurrentUser() {
    return this.firebaseAuth.currentUser;
  }

  // Get Current logged in user token
  public async getToken() {
    const user = this.getCurrentUser();
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return null;
  }

  // SignOut
  public async signOut() {
    return await this.firebaseAuth.signOut();
  }

  // Listen for Auth State Changes
  public onAuthStateChanged(callback: (user: User | null) => void) {
    return this.firebaseAuth.onAuthStateChanged(callback);
  }
}

export const AuthServiceInstance = Object.freeze(new AuthService());
