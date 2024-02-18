import {apps as firebaseApps} from "firebase-admin";
import {App, initializeApp} from "firebase-admin/app";
import {getFirestore, type Firestore} from "firebase-admin/firestore";
import {getAuth, type Auth} from "firebase-admin/auth";
import {getStorage, type Storage} from "firebase-admin/storage";

/**
 * FirebaseAdmin class to handle Firebase Admin SDK
 * @class FirebaseAdmin
 * @public
 * @exports FirebaseAdmin
 */
export class FirebaseAdmin {
  private app: App | undefined;
  private firestore: Firestore | undefined;
  private fireAuth: Auth | undefined;
  private fireStorage: Storage | undefined;

  /**
   * Get Firebase Admin app instance
   * @return {App} Firebase Admin app instance
   */
  private getApp(): App {
    if (!firebaseApps.length) {
      try {
        this.app = initializeApp();
      } catch (error) {
        throw new Error(`Error initializing Firebase app: ${error}`);
      }
    }
    this.app = firebaseApps[0] || this.app;
    return this.app as App;
  }

  /**
   * Get Firestore instance
   * @return {Firestore} Firestore instance
   */
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

  /**
   * Get Auth instance
   * @return {Auth} Auth instance
   */
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

  /**
   * Get Storage instance
   * @return {Storage} Storage instance
   */
  public getStorage(): Storage {
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
