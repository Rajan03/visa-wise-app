import { AuthServiceInstance, UserServiceInstance } from "@/services/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, subDomain } = await req.json();
  try {
    const decodeVerifyToken = await AuthServiceInstance.verifyIdToken(token);
    const authorizedUser = await UserServiceInstance.getUserInDomain(
      decodeVerifyToken.uid,
      subDomain
    );
    return NextResponse.json(authorizedUser, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
