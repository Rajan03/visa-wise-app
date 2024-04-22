import { UserService } from "./user";
import { auth } from "@/lib/client-firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, type Auth } from "firebase/auth";

class AuthServiceClass {
  private fireauth: Auth;

  constructor() {
    this.fireauth = auth;
  }

  async createOwner(email: string) {
    try {
      const password = "password";
      return await createUserWithEmailAndPassword(this.fireauth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async login(email: string, password: string, domainId: string) {
    try {
      const user = await UserService.userInDomain(email, domainId);
      if (!user) throw new Error("User not found");
      console.log("User found: ", user);

      return await signInWithEmailAndPassword(this.fireauth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const AuthService = Object.freeze(new AuthServiceClass());
