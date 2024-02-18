import { ModalState } from "@/types";
import { create } from "zustand";

export const useSignInModal = create<ModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: (state) => set({ isOpen: state }),
}));