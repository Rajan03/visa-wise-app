import { AuthServiceInstance } from "@/services/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  try {
    const token = await AuthServiceInstance.generateCustomToken(id);
    return new NextResponse(token, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
