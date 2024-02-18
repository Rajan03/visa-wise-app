import {auth} from "firebase-functions";
import {FirebaseAdmin} from "@config/admin-sdk";
import type {UserRecord} from "firebase-admin/auth";
import type {Firestore} from "firebase-admin/firestore";

/**
 * AuthFunctions class to handle Firebase Auth triggers
 * @class AuthFunctions
 * @public
 * @exports AuthFunctions
 */
class AuthFunctions {
  private fireStore: Firestore;

  /**
   * Constructor to initialize Firebase Admin SDK
   * @constructor
   * @public
   * @memberof AuthFunctions
   */
  constructor() {
    const admin = new FirebaseAdmin();
    this.fireStore = admin.getFirestore();
  }

  /**
   * Function to handle user creation
   * @param {UserRecord} user - Firebase Auth user record
   * @public
   */
  onCreateUser(user: UserRecord) {
    const {uid, email, customClaims} = user;
    console.log(`User created with email: ${email} and UID: ${uid}`);

    const admin = this.fireStore.collection("admins").doc(uid);
    admin
      .set({
        email,
        role: customClaims?.role || "admin",
        domain: customClaims?.domain,
        createdAt: new Date(),
      })
      .then(() => {
        console.log("Admin user created successfully");
      })
      .catch((error) => {
        console.error("Error creating admin user: ", error);
      });
  }

  /**
   * Register Firebase Auth triggers
   * @return {CloudFunction} - Firebase Cloud Function
   */
  registerFunction() {
    return auth.user().onCreate(this.onCreateUser);
  }
}

const userCreationHandler = new AuthFunctions();
exports.updateAdminsOnUserCreate = userCreationHandler.registerFunction();
