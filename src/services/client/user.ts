import FirebaseClient from "@/config/firebase";
import { Auth } from "firebase/auth";

class UserService {
  private firebaseAuth: Auth;

  constructor() {
    const firebaseClient = new FirebaseClient();
    this.firebaseAuth = firebaseClient.getAuth();
  }

  // Get a user from firebase auth using client sdk with given domain custom claim
    
}

export const UserServiceInstance = Object.freeze(new UserService());
