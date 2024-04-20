import { firestore } from "@/lib/client-firebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

export const useDoc = (path: string) => {
    const docSnap = useDocument(doc(firestore, path), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

    return docSnap;
}
