'use client';
import { AuthUser } from "@/config/appwrite";
import { create } from "zustand";

type AuthUserState = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void
};

export const useAuthUser = create<AuthUserState>((set) => ({
  user: null,
  setUser: (authUser) => set({ user: authUser }),
}));