import { SidebarStateWithId } from "@/types";
import { create } from "zustand";

export const useEnqSidebar = create<SidebarStateWithId>((set, get) => ({
  openId: null,
  open: (id) => set({ openId: id }),
  close: () => set({ openId: null }),
}));
