import { env } from "@/env";
import { initializeApp, getApps, getApp } from "firebase/app";

// Firebase Services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

const initApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const firestore = getFirestore(initApp);
export const auth = getAuth(initApp);
export const functions = getFunctions(initApp);