import { firestore } from "@/lib/client-firebase";
import { FirebaseModels } from "@/config";
import { IDomain } from "@/types";
import { doc, getDoc, type Firestore, setDoc } from "firebase/firestore";

class DomainServiceClass {
  firestore: Firestore;

  constructor() {
    this.firestore = firestore;
  }

  /**
   * Creates a domain in the database using firebase client SDK
   * @param data
   * @returns
   */
  async createDomain(data: IDomain) {
    // Check if domain with same name exists
    const domainDoc = `${FirebaseModels.domain}/${data.domainName}`;
    const docRef = doc(firestore, domainDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      throw new Error("Domain already exists");
    }

    await setDoc(docRef, {
      ...data,
      config: {
        logo: data.orgLogo || "",
        favicon: data.orgLogo || "",
        theme: "blue-light",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
      },
    });
    return docRef.id;
  }

  /**
   * Checks if a domain exists
   * @param domain
   * @returns
   */
  async validateDomain(domain: string) {
    const domainDoc = `${FirebaseModels.domain}/${domain}`;
    const docRef = doc(firestore, domainDoc);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Domain doesn't exists");
    }

    return docSnap.data() as IDomain;
  }
}

export const DomainService = Object.freeze(new DomainServiceClass());
