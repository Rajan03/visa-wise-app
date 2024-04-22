import { auth } from "@/lib/client-firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  return {
    user,
    loading,
    error,
  };
};
