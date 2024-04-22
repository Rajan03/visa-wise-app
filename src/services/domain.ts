import { firestore } from "@/lib/client-firebase";
import { FirebaseModels } from "@/config";
import { IDomain } from "@/types";
import { doc, getDoc, type Firestore, setDoc, updateDoc } from "firebase/firestore";

class DomainServiceClass {
  firestore: Firestore;

  constructor() {
    this.firestore = firestore;
  }

  async updateDomain(data: IDomain) {
    const domainDoc = `${FirebaseModels.domain}/${data.domainName}`;
    const docRef = doc(firestore, domainDoc);
    await updateDoc(docRef, {
      ...data,
      config: {
        onboarding: true,
      },
    });
    return docRef.id;
  }

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
