import AppWriteService from "@/config/appwrite";
import { Toaster } from "@/components";
import { AppModals } from "./Modals";
import { PopulateUser } from "./PopulateSignedInUser";

export async function RootProvider() {
    const user = await AppWriteService.GetSignedInUser();
  return (
    <>
      <PopulateUser user={user} />
      <AppModals />
      <Toaster />
    </>
  );
}
