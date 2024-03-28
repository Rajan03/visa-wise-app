import { signIn, signOut } from "next-auth/react";

class AuthService {
    async login(email: string) {
        return signIn("credentials", {
            
            });
    }

    async logout() {
        return signOut();
    }
}

const authService = new AuthService();
export default Object.freeze(authService);