import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/config/stripe";
import { UserServiceInstance } from "@/services/admin";

export async function POST(req: NextRequest) {
  const { amount, email, organization } = (await req.json()) as any;

  if (!amount || !email || !organization) {
    return new NextResponse("Organization and Email are required", {
      status: 400,
    });
  }
  
  try {
    // Check if email already exists
    const user = await UserServiceInstance.getUserByEmail(email);
    if (user && !!user.uid) {
      return new NextResponse("Email already exists", {
        status: 400,
      });
    }

    // Create a payment session
    const transformedItem = {
      price_data: {
        unit_amount: +amount * 100,
        currency: "usd",
        product_data: {
          name: `subscription`,
          description: `subscription for ${amount}`,
        },
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [transformedItem],
      mode: "payment",
      metadata: { email, organization },
      customer_email: email,
      success_url: `${req.headers.get(
        "referer"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("referer")}/cancel`,
    });

    return new NextResponse(session.id, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
