import { firestore } from "@/lib/client-firebase";
import { AppUser } from "@/types";
import { Firestore, doc, getDoc } from "firebase/firestore";

class UserServiceClass {
  private firestore: Firestore;

  constructor() {
    this.firestore = firestore;
  }

  // Check if user has access to domain
  async userInDomain(email: string, domainId: string) {
    try {
        // Find user by email
        const userDoc = `users/${email}`;
        const docRef = doc(this.firestore, userDoc);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("User not found");
        }

        const userData = docSnap.data() as AppUser;
        console.log({ userData, domainId });
        const userDomain = userData.domains.find((domain) => domain.id === domainId);
        if (!userDomain) {
          throw new Error("User not in domain");
        }

        return userDomain;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const UserService = Object.freeze(new UserServiceClass());
