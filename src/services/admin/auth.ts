import {fireAuthAdmin} from "@/config/firebase.admin";
import type { Auth } from "firebase-admin/auth";

class AdminAuth {
    firebaseAuth: Auth;

    constructor() {
        this.firebaseAuth = fireAuthAdmin; 
    }

    async createCustomToken(uid: string): Promise<string> {
        return this.firebaseAuth.createCustomToken(uid);
    }
}

export default Object.freeze(new AdminAuth());