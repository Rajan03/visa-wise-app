import { env } from "@/env";
import { initializeApp, getApps } from "firebase/app";

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
  private firestore: Firestore | undefined;
  private fireAuth: Auth | undefined;
  private fireStorage: FirebaseStorage | undefined;

  private getApp(): FirebaseApp {
    const firebaseApps = getApps();
    if (!firebaseApps.length) {
      try {
        this.app = initializeApp(firebaseConfig);
      } catch (error) {
        throw new Error(`Error initializing Firebase app: ${error}`);
      }
    }
    this.app = firebaseApps[0] || this.app;
    return this.app as FirebaseApp;
  }

  public getFirestore(): Firestore {
    if (!this.firestore) {
      try {
        const app = this.getApp();
        this.firestore = getFirestore(app);
      } catch (error) {
        throw new Error(`Error getting Firestore instance: ${error}`);
      }
    }
    return this.firestore;
  }

  public getAuth(): Auth {
    if (!this.fireAuth) {
      try {
        const app = this.getApp();
        this.fireAuth = getAuth(app);
      } catch (error) {
        throw new Error(`Error getting Auth instance: ${error}`);
      }
    }
    return this.fireAuth;
  }

  public getStorage(): FirebaseStorage {
    if (!this.fireStorage) {
      try {
        const app = this.getApp();
        this.fireStorage = getStorage(app);
      } catch (error) {
        throw new Error(`Error getting Storage instance: ${error}`);
      }
    }
    return this.fireStorage;
  }
}

export default FirebaseClient;
