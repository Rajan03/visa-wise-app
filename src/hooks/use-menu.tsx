import { MenuState, MenuStateWithId } from "@/types";
import { create } from "zustand";

export const useProfileMenu = create<MenuState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: (state) => set({ isOpen: state }),
}));

export const useEnquiryMenu = create<MenuStateWithId>((set, get) => ({
  openId: null,
  open: (id) => set({ openId: id }),
  close: () => set({ openId: null }),
}));
