import FirebaseClient from "@/config/firebase";

class UserService {
  private firebaseInstance: FirebaseClient;

  constructor() {
    this.firebaseInstance = FirebaseClient.getInstance();
  }
}

export const UserServiceInstance = Object.freeze(new UserService());
