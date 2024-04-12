import { auth } from "@/lib/client-firebase";
import { AppRoles } from "@/types";
import { createUserWithEmailAndPassword, type Auth } from "firebase/auth";

class AuthServiceClass {
  private fireauth: Auth;

  constructor() {
    this.fireauth = auth;
  }

  async signUp(
    email: string,
    password: string,
    domainName: string,
    role?: AppRoles = AppRoles.User
  ) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.fireauth,
        email,
        password
      );

      // Create Custom Claims
      // await
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async login(email: string, password: string, domainName: string) {}
}

export const AuthService = Object.freeze(new AuthServiceClass());
