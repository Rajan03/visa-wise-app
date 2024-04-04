import { firestore } from "@/lib/client-firebase";
import { IDomain } from "@/types";
import { doc, type DocumentSnapshot } from "@firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

export const useDomain = () => {
  const [domainData, setDomainData] = useState<IDomain | null>(null);

  // Get domainId from router
  const router = useRouter();
  const { domain: domainId } = router.query;

  // Get domain data from Firestore
  const domainRef = firestore && doc(firestore, `domain/${domainId}`);
  const [domain, loading, error] = useDocument(domainRef);

  useEffect(() => {
    if (domain && domain.exists()) {
      setDomainData(domain.data() as IDomain);
    }
  }, [domain]);

  // If domainId is not a string, return null
  if (!domainId || typeof domainId !== "string") {
    return {
      domain: null,
      loading: false,
      error: null,
    };
  }

  // If domain does not exist, return null
  if (!domain || (domain && !domain.exists())) {
    return {
      domain: null,
      loading,
      error,
    };
  }

  // If domain exists, return domain data
  return {
    domain: domainData,
    domainDoc: domain as DocumentSnapshot<IDomain>,
    loading,
    error,
  };
};
