import { IDomain } from "@/types";
import { create } from "zustand";

interface DomainState {
    domain: IDomain | null,
    setDomain: (domain: IDomain) => void,
}
export const useDomain = create<DomainState>((set) => ({
    domain: null,
    setDomain: (domain: IDomain) => set({ domain }),
}));
