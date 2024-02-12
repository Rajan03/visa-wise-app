import { NextSearchParams } from "@/types";
import AppWriteService from "@/config/appwrite";
import { ErrorUI, SuccessUI } from "../_components";

export default async function Home({
  searchParams,
}: {
  searchParams: NextSearchParams;
}) {
  if (searchParams && searchParams.secret && searchParams.userId) {
    const secret = searchParams.secret as string;
    const userId = searchParams.userId as string;
    const isVerified = await AppWriteService.verifyUser(userId, secret);

    return isVerified ? <SuccessUI /> : <ErrorUI />;
  } else {
    return <ErrorUI />;
  }
}


