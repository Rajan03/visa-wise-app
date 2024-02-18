import { FirebaseAdmin } from "@/config/firebase.admin";
import { IDomain } from "@/types";

class DomainService {
  private firebaseAdmin: FirebaseAdmin;

  constructor() {
    this.firebaseAdmin = new FirebaseAdmin();
  }

  // Create a domain collection with given uid, email and domain
  async createDomain(uid: string, domain: string) {
    try {
      const newdomain = await this.firebaseAdmin
        .getDocument<IDomain>("domains", uid)
        .set({
          owner: uid,
          domain,
        });
      return newdomain;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Returns the domain document
  async getDomain(uid: string) {
    try {
      const domain = await this.firebaseAdmin
        .getDocument<IDomain>("domains", uid)
        .get();
      return domain.data();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const DomainServiceInstance = Object.freeze(new DomainService());
