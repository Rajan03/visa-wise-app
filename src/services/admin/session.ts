import { FirebaseAdmin } from "@/config/firebase.admin";
import { Firestore } from "firebase-admin/firestore";

class SessionService {
  private fireStore: Firestore;

  constructor() {
    const firebaseAdmin = new FirebaseAdmin();
    this.fireStore = firebaseAdmin.getFirestore();
  }

  // Create a new session in firestore
  async createSession(email: string, sessionId: string, subscription: number) {
    try {
      const session = await this.fireStore
        .collection("sessions")
        .doc(sessionId)
        .set({
          email: email,
          sessionId: sessionId,
          subscription: subscription,
          updatedAt: new Date(),
          createdAt: new Date(),
        });

      return session;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Get a session from firestore
  async getSession(uid: string) {
    try {
      const session = await this.fireStore
        .collection("sessions")
        .doc(uid)
        .get();
      return session;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Get Session by email
  async getSessionByEmail(email: string) {
    try {
      const session = await this.fireStore
        .collection("sessions")
        .where("email", "==", email)
        .get();
      return session;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const SessionServiceInstance = Object.freeze(new SessionService());
