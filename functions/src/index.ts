import { onCreate } from './domain';
import * as admin from 'firebase-admin';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

// Initialize Firebase app
if (!admin.apps?.length) admin.initializeApp();

// On Domain create, Create owners account and provide custom claims as owner and domain id
export const onDomainCreate = onDocumentCreated('domains/{domainId}', onCreate);