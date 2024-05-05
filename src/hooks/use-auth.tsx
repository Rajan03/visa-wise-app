import { auth } from "@/lib/client-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDoc } from "./use-firestore";
import { FirebaseModels } from "@/config";
import { AppUser, AuthUser } from "@/types";
import { useEffect, useState } from "react";

type UserWithRole = {
  role: string;
  domain: string;
} & AuthUser;

export const useAuth = () => {
  const [prevUser, setPrevUser] = useState<UserWithRole | null>(null);
  const [user, loading, error] = useAuthState(auth);
  const [domainUser, loadingUser, errorUser] = useDoc<AppUser>(
    `${FirebaseModels.user}/${user?.uid}`
  );

  useEffect(() => {
    if (!prevUser && user && domainUser) {
      console.log("User and Domain User", user, domainUser.data());

      setPrevUser({
        ...user,
        role: domainUser.data()?.domain.role as string,
        domain: domainUser.data()?.domain.id as string,
      });
    }
  }, [user, domainUser, prevUser]);

  return {
    user:
      user && domainUser
        ? ({
            ...user,
            role: domainUser.data()?.domain.role,
            domain: domainUser.data()?.domain.id,
          } as AuthUser)
        : null,
    prevUser,
    loading: loading || loadingUser,
    error: error || errorUser,
  };
};
