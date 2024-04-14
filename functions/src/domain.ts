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
  emailVerified: boolean;
  displayName: string;
  password: string;
  disabled: boolean;
};

// TODO: Transaction for all operations to make it atomic. If any operation fails, rollback all operations.
// TODO: Also, handle if user exists in auth and errors.

// On new domain create,
// 1. Create owner user with custom claims (role: Owner, domain: domainId)
// 2. Add user to domain -> users collection with role: Owner
// 3. Add user to users collection with that domain and role in domains array
// Note: A user can have multiple domains with different roles in each domain but will have only one role in a domain
// so, in domain -> users collection only single document will be created for a user in a domain with the latest role
// and in users collection, a user will have multiple domains with different roles in each domain in domains array
export const onCreate = (event: EventType) => {
  if (!event || !event.data) return;

  const domainSnap = event.data;
  const domain = domainSnap.data() as IDomain;
  logger.info("Domain created", domain);

  // Owner Info
  const owner = {
    email: domain.ownerEmail,
    emailVerified: true,
    displayName: domain.ownerName,
    password: generateRandomPassword(),
    disabled: false,
  };

  // Create owner user with custom claims
  createOwner(owner)
    .then((ownerUser) => {
      logger.info(
        "Successfully created new user:",
        ownerUser.uid,
        "with email:",
        ownerUser.email,
        "and password:",
        owner.password
      );

      // Add custom claims
      addOwnerClaims(ownerUser.uid, domainSnap.id).then(() =>
        logger.info("Added user claims")
      );

      // Add user to domain -> users collection
      addDomainUser(domainSnap.id, ownerUser.uid, owner).then(() =>
        logger.info("User added to domain users")
      );

      // Add user to users collection
      addUserToApp(domainSnap.id, owner).then(() =>
        logger.info("User added to users collection")
      );
    })
    .catch((error) => {
      logger.info("Error creating new user:", error);
    });
};

// Create Owner User
function createOwner(owner: OwnerType) {
  return admin.auth().createUser(owner);
}

// Add Claims for owner
function addOwnerClaims(id: string, domain: string) {
  return admin.auth().setCustomUserClaims(id, {
    role: AppRoles.Owner,
    domain: domain,
  });
}

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
      displayName: owner.displayName,
      role: AppRoles.Owner,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
}

// Add user to app
function addUserToApp(domain: string, owner: OwnerType) {
  return admin
    .firestore()
    .collection("users")
    .doc(owner.email)
    .set({
      email: owner.email,
      displayName: owner.displayName,
      domains: [
        {
          id: domain,
          role: AppRoles.Owner,
        },
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
}

//#region Helper Methods
const generateRandomPassword = () => {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }

  return password;
};
//#endregion
