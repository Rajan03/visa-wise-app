import { signIn, signOut } from "next-auth/react";

class AuthService {
    async login() {
        return signIn("google");
    }

    async logout() {
        return signOut();
    }
}

const authService = new AuthService();
export default Object.freeze(authService);