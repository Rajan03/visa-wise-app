import { firestore } from "@/config/firebase.client";
import { AppCollections } from "@/lib";
import { IDomain } from "@/types";
import { doc, getDoc, type Firestore, setDoc } from "firebase/firestore";

class ClientDomain {
  firestore: Firestore;

  constructor() {
    this.firestore = firestore;
  }

  /**
   * Creates a domain in the database
   * @param data
   * @returns
   */
  async createDomain(data: IDomain) {
    // Check if domain with same name exists
    const domainDoc = `${AppCollections.domain.collectionName}/${data.domainName}`;
    const docRef = doc(firestore, domainDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      throw new Error("Domain already exists");
    }

    await setDoc(docRef, data);
    return data.domainName;
  }

  /**
   * Checks if a domain exists
   * @param domain
   * @returns
   */
  async validateDomain(domain: string) {
    const domainDoc = `${AppCollections.domain.collectionName}/${domain}`;
    const docRef = doc(firestore, domainDoc);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Domain doesn't exists");
    }

    return docSnap.data() as IDomain;
  }
}

export const DomainClient = Object.freeze(new ClientDomain());
