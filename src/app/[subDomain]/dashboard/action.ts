"use server";

import { AuthServiceInstance, UserServiceInstance } from "@/services/admin";

export async function verifyDomain(token: string, subDomain: string) {
  try {
    const decodeVerifyToken = await AuthServiceInstance.verifyIdToken(token);
    const authorizedUser = await UserServiceInstance.getUserInDomain(
      decodeVerifyToken.uid,
      subDomain
    );
    return authorizedUser.toJSON();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
