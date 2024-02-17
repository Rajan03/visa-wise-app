import { env } from "@/env";
import { initializeApp } from "firebase/app";

import type { FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

class FirebaseClient {
  private app: FirebaseApp | undefined;
  private firestore: Firestore;
  private fireAuth: Auth;
  private fireStorage: FirebaseStorage;

  private constructor() {
    if (initializeApp.length) {
      this.firestore = getFirestore(this.app as FirebaseApp);
      this.fireAuth = getAuth(this.app as FirebaseApp);
      this.fireStorage = getStorage(this.app as FirebaseApp);
      return;
    }

    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.app);
    this.fireAuth = getAuth(this.app);
    this.fireStorage = getStorage(this.app);
  }

  public getFirestore(): Firestore {
    return this.firestore;
  }

  public getAuth(): Auth {
    return this.fireAuth;
  }

  public getStorage(): FirebaseStorage {
    return this.fireStorage;
  }
}

export default FirebaseClient;
