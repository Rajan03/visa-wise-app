import { FirebaseAdmin } from "@/config/firebase.admin";
import { Auth } from "firebase-admin/auth";

class UserService {
  private firebaseAuth: Auth;

  constructor() {
    const firebaseAdmin = new FirebaseAdmin();
    this.firebaseAuth = firebaseAdmin.getAuth();
  }

  // Generate random password with email
  public generatePassword(email: string) {
    return email + Math.random().toString(36).slice(-8);
  }

  // Create a new user in firebase auth using admin sdk with given email and password
  async createUser(name: string, email: string, password: string) {
    try {
      const user = await this.firebaseAuth.createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: name,
        disabled: false,
      });

      // set custom claims to user
      await this.firebaseAuth.setCustomUserClaims(user.uid, { role: "user" });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Delete a user from firebase auth using admin sdk with given uid
  async deleteUser(uid: string) {
    try {
      await this.firebaseAuth.deleteUser(uid);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Update a user in firebase auth using admin sdk with given uid and data
  async updateUser(uid: string, data: { name: string; email: string }) {
    try {
      await this.firebaseAuth.updateUser(uid, {
        displayName: data.name,
        email: data.email,
      });
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Get a user from firebase auth using admin sdk with given uid
  async getUser(uid: string) {
    try {
      const user = await this.firebaseAuth.getUser(uid);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const UserServiceInstance = Object.freeze(new UserService());