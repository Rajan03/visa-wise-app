import { AuthServiceInstance } from "@/services/client";
import { User } from "firebase/auth";
import { create } from "zustand";

type loginProps = {
  email: string;
  password: string;
};

type AuthUserState = {
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;

  login: (props: loginProps) => Promise<User>;
  logout: () => void;
};

export const useAuthUser = create<AuthUserState>((set, get) => ({
  isLoading: true,
  user: null,
  setUser: (user) => set({ user, isLoading: false }),

  login: async ({ email, password }) => {
    try {
      const user = await AuthServiceInstance.signIn({ email, password });
      set({ user });
      return user;
    } catch (error: any) {
      if (
        error.message === "Firebase: Error (auth/invalid-credential)."
      ) {
        throw new Error("Invalid email or password");
      }
      
      throw new Error(error.message);
    }
  },
  logout: async () => {
    try {
      await AuthServiceInstance.signOut();
      set({ user: null });
    }
    catch (error: any) {
      throw new Error(error.message);
    }
  },
}));
