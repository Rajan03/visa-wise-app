import { emailService } from "@/config/emailService";
import { stripe } from "@/config/stripe";
import { env } from "@/env";
import { DomainServiceInstance, UserServiceInstance } from "@/services/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.text()) as any;
  const sig = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      env.STRIPE_ENDPOINT_ECRET
    );
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }

  console.log("Event: ", event.type);

  // Handle the event - checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const email = session.customer_details?.email as string;
    const name = session.customer_details?.name as string;
    const organization = session.metadata.org as string;

    console.log("Session: ", session.id);
    try {
      await createUser(session.id, email, name, organization);

      // TODO: Handle case where any of above actions fail to complete in webhook
      return new NextResponse("Subscription Created", {
        status: 200,
      });
    } catch (error: any) {
      return new NextResponse(error.message, {
        status: 400,
      });
    }
  }

  return new NextResponse("Event not handled", {
    status: 400,
  });
}

async function createUser(
  userId: string,
  email: string,
  name: string,
  organization: string
) {
  const psw = UserServiceInstance.generateRandom(email);
  const orgName = UserServiceInstance.generateRandom(organization);

  try {
    // Create a new user in firebase auth
    // TODO: use cloud function to create domain
    const [admin, domain] = await Promise.all([
      await UserServiceInstance.createUser(
        name,
        email,
        psw,
        orgName,
        "admin",
        userId
      ),
      await DomainServiceInstance.createDomain(userId, orgName),
    ]);

    console.log("Admin: ", admin);
    console.log("Domain: ", domain);
  } catch (error: any) {
    console.log("Error creating user: ", error.message);
    return false;
  }

  // TODO: Replace and run fxn to trigger email and send admin a notification
  triggerEmail(email, psw);
  return true;
}

// Trigger email to user with login credentials
async function triggerEmail(email: string, psw: string) {
  try {
    // Send email with login credentials
    await emailService.sendLoginCredMail(email, {
      username: email,
      password: psw,
    });

    return true;
  } catch (error: any) {
    console.log("Error in EMAIL: ", error.message);

    return false;
  }
}
