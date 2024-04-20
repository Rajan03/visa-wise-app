import { type AdminFirestore, firestoreAdmin } from "@/lib/admin-firebase";
import { StripeSession } from "@/lib/stripe";

class SessionServiceClass {
  private firestore: AdminFirestore;

  constructor() {
    this.firestore = firestoreAdmin;
  }

  async createSession(session: StripeSession) {
    try {
      const email = session.customer_details?.email as string;
      const name = session.customer_details?.name as string;
      const domain = session.metadata?.domain as string;

      const sessionRef = this.firestore
        .collection("stripe_sessions")
        .doc(session.id);
      const userSession = {
        sessions: [session],
        email,
        name,
        domain,
        createdAt: new Date().toISOString(),
      };

      await sessionRef.set(userSession);
      return userSession;
    } catch (error) {
      console.log("Error storing session: ", error);
      return null;
    }
  }
}

export const SessionService = Object.freeze(new SessionServiceClass());
