import { MenuState, MenuStateWithId } from "@/types";
import { create } from "zustand";

export const useProfileMenu = create<MenuState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: (state) => set({ isOpen: state }),
}));

export const useEnquiryMenu = create<MenuStateWithId>((set, get) => ({
  isOpen: [],
  open: (id) => set({ isOpen: [...get().isOpen, id] }),
  close: (id) => set({ isOpen: get().isOpen.filter((i) => id !== i) }),
  toggle: (id, state) => {
    if (state) {
      set({ isOpen: [...get().isOpen, id] });
    } else {
      set({ isOpen: get().isOpen.filter((i) => id !== i) });
    }
  }
}));
