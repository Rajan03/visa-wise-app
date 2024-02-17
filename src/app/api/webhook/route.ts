import { emailService } from "@/config/emailService";
import { stripe } from "@/config/stripe";
import { env } from "@/env";
import { SessionServiceInstance, UserServiceInstance } from "@/services";
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

    console.log("Session: ", session.id);
    const subscription = await createSubscription(email, session.id);
    if (!subscription) {
      return new NextResponse("Subscription Failed", {
        status: 400,
      });
    }

    const user = await createUser(email, name);
    if (!user) {
      return new NextResponse("User Creation Failed", {
        status: 400,
      });
    }

    // TODO: Handle case where any of above actions fail to complete
    return new NextResponse("Subscription Created", {
      status: 200,
    });
  }

  return new NextResponse("Event not handled", {
    status: 400,
  });
}

async function createSubscription(email: string, session: string) {
  try {
    await SessionServiceInstance.createSession(email, session, 1);
    console.log("New Session Created ");

    // TODO: Run a firebase function to send a welcome email and send admin a notification
    return true;
  } catch (error: any) {
    console.log("Error: ", error.message);

    return false;
  }
}

async function createUser(email: string, name: string) {
  try {
    const psw = UserServiceInstance.generatePassword(email);
    // Create a new user in firebase auth
    const user = await UserServiceInstance.createUser(name, email, psw);
    console.log("New User: ", user.email);

    // Send email with login credentials
    const emailSent = await emailService.sendLoginCredMail(email, {
      username: email,
      password: psw,
    });

    if (!emailSent) {
      return false;
    }
  } catch (error: any) {
    console.log("Error: ", error.message);

    return false;
  }

  // TODO: Run a firebase function to send a welcome email and send admin a notification
  return true;
}
