import { sendSignInLinkToEmail } from "firebase/auth";
import { signIn, signOut } from "next-auth/react";

class AuthService {
    async login(email: string) {
        return // sendSignInLinkToEmail("google");
    }

    async logout() {
        return signOut();
    }
}

const authService = new AuthService();
export default Object.freeze(authService);