import { env } from "@/env";
import { StripeSession, stripe } from "@/lib/stripe";
import { DomainService, SessionService } from "@/services/admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { IDomain } from "@/types";

type ResponseData = {
  message?: string;
  id?: string;
};

export const config = { api: { bodyParser: false } };
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
  const sig = req.headers["stripe-signature"] as string;

  // Event is the Stripe event
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      env.STRIPE_ENDPOINT_SECRET
    );
  } catch (error: any) {
    console.log("Error creating event: ", error.message);
    return res.status(400).json({ message: error.message });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as StripeSession;
      console.log("Session: ", session.id);
      const sessionInFirebase = await SessionService.createSession(session);
      if (!sessionInFirebase) {
        console.log("Session Creation Failed");
        return res.status(400).json({ message: "Session Creation Failed" });
      }

      console.log("Session Created");
      const domain: IDomain = {
        orgName: "VisaWise",
        domainName: session.metadata!.domain,
        address: "",
        city: "",
        country: "",
        ownerName: "",
        ownerEmail: session.metadata!.email,
        contactName: "",
        contactEmail: "",
        brn: "",
        tin: "",
        config: {
          onboarding: false,
          theme: "green-light",
          twitter: "",
          instagram: "",
          facebook: "",
          favicon: "",
          linkedin: "",
          logo: "",
          session_id: session.id,
        },
      };
      await DomainService.createDomain(domain);
      return res.status(200).json({ message: "Session Created" });
    } catch (error: any) {
      console.log("Error creating session: ", error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(400).json({ message: "Event not handled" });
}
