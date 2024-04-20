import { stripe } from "@/lib/stripe";
import { UserService } from "@/services";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  id?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "POST":
      return Post(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function Post(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { amount, email, domain } = req.body;

  if (!amount || !email) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // Check if email already exists
  try {
    const isUser = await UserService.userExists(email);
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }

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

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [transformedItem],
      mode: "payment",
      metadata: { email, domain },
      customer_email: email,
      success_url: `${req.headers.origin}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    
    return res.status(200).json({ id: session.id });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
