import { UserService } from "./user";
import { auth } from "@/lib/client-firebase";
import { signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, type Auth } from "firebase/auth";

class AuthServiceClass {
  private fireauth: Auth;

  constructor() {
    this.fireauth = auth;
  }

  async login(email: string, password: string, domainId: string) {
    try {
      const userDomain = await UserService.userInDomain(email, domainId);
      if (!userDomain) {
        throw new Error("User not found");
      }

      return await signInWithEmailAndPassword(this.fireauth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const AuthService = Object.freeze(new AuthServiceClass());
