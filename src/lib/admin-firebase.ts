import { env } from "@/env";
import admin from "firebase-admin";
import type { App } from "firebase-admin/app";

let initApp: App;
const creds = admin.credential.cert({
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY,
});

if (!admin.apps.length) {
  console.log("Firebase Admin Initialized");
  initApp = admin.initializeApp({
    credential: creds,
  });
} else {
  console.log("Firebase Admin already initialized");
  initApp = admin.apps[0]!;
}

export const firestoreAdmin = admin.firestore(initApp);
export const fireAuthAdmin = admin.auth(initApp);
export type AdminFirestore = admin.firestore.Firestore;
