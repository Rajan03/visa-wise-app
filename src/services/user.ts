import { firestore } from "@/lib/client-firebase";
import { AppUser } from "@/types";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

class UserServiceClass {
  private firestore: Firestore;

  constructor() {
    this.firestore = firestore;
  }

  // Check if user has access to domain
  async userInDomain(email: string, domainId: string) {
    try {
      // Find user by email
      const docQuery = query(
        collection(this.firestore, `users`),
        where("email", "==", email)
      );
      const docSnap = await getDocs(docQuery);
      if (docSnap.empty) {
        throw new Error("User not found");
      }

      const userData = docSnap.docs[0].data() as AppUser;
      console.log({ userData, domainId });
      const userDomain = userData.domain.id === domainId;
      if (!userDomain) {
        throw new Error("User not in domain");
      }

      return userData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Check if user exists
  async userExists(email: string) {
    try {
      const userDoc = `users/${email}`;
      const docRef = doc(this.firestore, userDoc);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return false;
      }

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const UserService = Object.freeze(new UserServiceClass());
