import { firestore } from "@/lib/client-firebase";
import { IDomain } from "@/types";
import { doc, getDoc } from "@firebase/firestore";
import { create } from "zustand";

type State = {
  loading: boolean;
  error: string | null;
  domain: IDomain | null;
  setDomain: (domain: IDomain) => void;
  getDomain: (domain: string) => Promise<void>;
};

export const useDomain = create<State>((set) => ({
  loading: true,
  error: null,
  domain: null,
  setDomain: (domain) => set({ domain }),
  getDomain: async (domain) => {
    set({ loading: true, error: null });

    try {
      const docRef = doc(firestore, "domain", domain);
      const data = await getDoc(docRef);
      if (!data.exists()) {
        throw new Error("Domain not found");
      }

      set({ domain: data.data() as IDomain, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
