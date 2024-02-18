import { create } from "zustand";

type loginProps = {
  email: string;
  password: string;
  onError: (message: string) => void;
};

type AuthUserState = {
  user: any | null;
  setUser: (user: any | null) => void;

  login: (props: loginProps) => Promise<any | null>;
  logout: () => void;
};

export const useAuthUser = create<AuthUserState>((set, get) => ({
  user: null,
  setUser: (authUser) => set({ user: authUser }),

  login: async ({ email, password, onError }) => {},
  logout: () => {},
}));
