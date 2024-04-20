// Firebase
import * as admin from "firebase-admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { FirestoreEvent } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

// Types
import { AppRoles, IDomain } from "./types";

// Event type
type EventType = FirestoreEvent<QueryDocumentSnapshot | undefined>;
type OwnerType = {
  email: string;
  name: string;
};

export const onCreate = (event: EventType) => {
  if (!event || !event.data) return;

  const domainSnap = event.data;
  const domain = domainSnap.data() as IDomain;
  logger.info("Domain created", domain);

  // Add user to domain -> users collection
  addDomainUser(domainSnap.id, domain.ownerId!, {
    email: domain.ownerEmail,
    name: domain.ownerName,
  }).then(() =>
    logger.info("User added to domain users")
  );

  // Add user to users collection
  addUserToApp(domainSnap.id, domain.ownerId!, {
    email: domain.ownerEmail,
    name: domain.ownerName,
  }).then(() => logger.info("User added to users collection"));
};

// Add user in domain
function addDomainUser(domain: string, ownerId: string, owner: OwnerType) {
  return admin
    .firestore()
    .collection("domains")
    .doc(domain)
    .collection("users")
    .doc(ownerId)
    .set({
      email: owner.email,
      displayName: owner.name,
      role: AppRoles.Owner,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
}

// Add user to app
function addUserToApp(domain: string, ownerId: string, owner: OwnerType) {
  return admin
    .firestore()
    .collection("users")
    .doc(ownerId)
    .set({
      uid: ownerId,
      email: owner.email,
      displayName: owner.name,
      domains: [
        {
          id: domain,
          role: AppRoles.Owner,
        },
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
}
