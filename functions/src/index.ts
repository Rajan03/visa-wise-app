import { onUpdate } from './domain';
import * as admin from 'firebase-admin';
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { env } from './env';

const creds = admin.credential.cert({
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY,
});

// Initialize Firebase app
if (!admin.apps?.length) admin.initializeApp({
  credential: creds,
});

// On Domain create, Create owners account and provide custom claims as owner and domain id
export const onDomainUpdate = onDocumentUpdated('domains/{domainId}', onUpdate);