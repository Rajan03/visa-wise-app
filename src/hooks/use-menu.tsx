import { MenuState } from "@/types";
import { create } from "zustand";

export const useProfileMenu = create<MenuState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: (state) => set({ isOpen: state }),
}));
