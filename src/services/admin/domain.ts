import { type AdminFirestore, firestoreAdmin } from "@/lib/admin-firebase";
import { IDomain } from "@/types";

class DomainServiceClass {
  private firestore: AdminFirestore;

  constructor() {
    this.firestore = firestoreAdmin;
  }

  async createDomain(domain: IDomain) {
    try {
        const domainRef = this.firestore.collection("domains").doc(domain.domainName);
        await domainRef.set(domain);
        return domain;
    } catch (error) {
      console.log("Error creating domain: ", error);
      return null;
    }
  }

  async getDomainByStripeId(sessionId: string){
    try {
      const domainRef = this.firestore
        .collection("domains")
        .where("config.session_id", "==", sessionId);
      const domain = await domainRef.get();
      return domain.docs[0].data() as IDomain;
    } catch (error) {
      console.log("Error getting domain: ", error);
      return null;
    }
  
  }
}

export const DomainService = Object.freeze(new DomainServiceClass());
