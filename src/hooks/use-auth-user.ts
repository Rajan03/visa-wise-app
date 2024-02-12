import AppWriteService, {
  type AuthUser,
  type Session,
} from "@/config/appwrite";
import { create } from "zustand";

type AuthUserState = {
  user: AuthUser | null;
  session: Session | null;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: Session | null) => void;

  login: (
    email: string,
    password: string,
    onError: (message: string) => void
  ) => Promise<Session | null>;
  signUp: (
    email: string,
    password: string,
    onError: (message: string) => void
  ) => Promise<AuthUser | null>;
  logout: () => void;

  setCurrentSession: () => Promise<Session>;
};

export const useAuthUser = create<AuthUserState>((set, get) => ({
  user: null,
  session: null,
  setUser: (authUser) => set({ user: authUser }),
  setSession: (session) => set({ session }),

  login: async (email, password, onError) => {
    const session = await AppWriteService.SignInUser(
      email as string,
      password as string,
      onError
    );

    if (session) {
      set({ session });
    }

    return session;
  },

  signUp: async (email, password, onError) => {
    const user = await AppWriteService.SignUpUser(
      email as string,
      password as string,
      onError
    );
    if (!user) return null;
    return user;
  },

  logout: () => {},

  setCurrentSession: async () => {
    const session = await AppWriteService.getSignedInSession();
    if (session) {
      set({ session });
    }
    return session;
  },
}));
