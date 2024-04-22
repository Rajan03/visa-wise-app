import { FirebaseModels } from "@/config";
import { IDomain } from "@/types";
import { type DocumentSnapshot } from "@firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDoc } from "./use-firestore";

export const useDomain = () => {
  // Get domainId from router
  const router = useRouter();
  const { domain: domainId } = router.query;

  // Get domain data from Firestore
  const [domain, loading, error] = useDoc(
    `${FirebaseModels.domain}/${domainId}`
  );

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
    domain: domain.data() as IDomain,
    domainDoc: domain as DocumentSnapshot<IDomain>,
    loading,
    error,
  };
};
