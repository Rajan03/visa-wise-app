import { FirebaseAdmin } from "@/config/firebase.admin";
import { Auth } from "firebase-admin/auth";
import crypto from "crypto";

class UserService {
  private firebaseAuth: Auth;

  constructor() {
    const firebaseAdmin = new FirebaseAdmin();
    this.firebaseAuth = firebaseAdmin.getAuth();
  }

  // Generate random password with email
  public generateRandom(email: string) {
    return crypto.createHash("sha256").update(email).digest("hex").slice(0, 8);
  }

  // Create a new user in firebase auth using admin sdk with given email and password
  async createUser(
    name: string,
    email: string,
    password: string,
    organization: string,
    role: string = "user",
    id?: string
  ) {
    try {
      const userCred = id ? { uid: id } : {};
      const user = await this.firebaseAuth.createUser({
        ...userCred,
        email: email,
        emailVerified: false,
        password: password,
        displayName: name,
        disabled: false,
      });

      // set custom claims to user
      const customClaims = { role, domain: organization };
      await this.firebaseAuth.setCustomUserClaims(user.uid, customClaims);
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

  // Get a user from firebase auth using admin sdk with given uid and domain
  async getUserInDomain(uid: string, domain: string) {
    try {
      const user = await this.firebaseAuth.getUser(uid);
      if (user.customClaims?.domain !== domain) {
        throw new Error("User does not belong to this domain");
      }
      
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Get a user from firebase auth using admin sdk with given email
  async getUserByEmail(email: string) {
    try {
      const user = await this.firebaseAuth.getUserByEmail(email);
      return user;
    } catch (error: any) {
      if (error.errorInfo.code === "auth/user-not-found") {
        return null;
      }

      throw new Error(error.message);
    }
  }
}

export const UserServiceInstance = Object.freeze(new UserService());
