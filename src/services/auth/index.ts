import { signIn, signOut } from "next-auth/react";

class AuthServiceC {
  async login(email: string, psw: string, domain: string) {
    return signIn("credentials", {
      email,
      password: psw,
      domain,
    });
  }

  async logout() {
    return signOut();
  }
}

export const AuthService = Object.freeze(new AuthServiceC());
