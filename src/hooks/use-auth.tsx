import { auth } from "@/lib/client-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDoc } from "./use-firestore";
import { FirebaseModels } from "@/config";
import { AppUser, AuthUser } from "@/types";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  const [domainUser, loadingUser, errorUser] = useDoc<AppUser>(
    `${FirebaseModels.user}/${user?.uid}`
  );

  if (!user) {
    return {
      user: null,
      loading: false,
      error: null,
    };
  }

  if (!domainUser || (domainUser && !domainUser.exists())) {
    return {
      user: null,
      loading: loadingUser,
      error: errorUser,
    };
  }

  return {
    user: {
      ...user,
      role: domainUser.data()?.domain.role,
      domain: domainUser.data()?.domain.id,
    } as AuthUser,
    loading,
    error,
  };
};
