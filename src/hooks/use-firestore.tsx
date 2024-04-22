import { firestore } from "@/lib/client-firebase";
import { doc } from "firebase/firestore";
import { DocumentHook, useDocument } from "react-firebase-hooks/firestore";

export function useDoc<T>(path: string) {
    const docSnap = useDocument(doc(firestore, path), {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    });

    return docSnap as DocumentHook<T>;
}
