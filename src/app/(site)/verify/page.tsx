import { NextSearchParams } from "@/types";
import { ErrorUI, SuccessUI } from "../_components";

export default async function Home({
  searchParams,
}: {
  searchParams: NextSearchParams;
}) {
  if (searchParams && searchParams.secret && searchParams.userId) {
    const secret = searchParams.secret as string;
    const userId = searchParams.userId as string;
    const isVerified = true;

    return isVerified ? <SuccessUI /> : <ErrorUI />;
  } else {
    return <ErrorUI />;
  }
}


