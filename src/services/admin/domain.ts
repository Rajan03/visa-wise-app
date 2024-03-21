import { firestoreAdmin as firestore } from "@/config/firebase.admin";
import { type Firestore, } from "firebase-admin/firestore";

class AdminDomain {
  firestore: Firestore;

  constructor() {
    this.firestore = firestore;
  }

}

export const DomainClient = Object.freeze(new AdminDomain());
