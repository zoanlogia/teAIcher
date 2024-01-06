import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

// This code snippet exports an asynchronous function named POST that handles a POST request.

// The function expects a Request object as a parameter. It extracts the request body and a signature from the headers. Then, it tries to construct a Stripe event using the stripe.webhooks.constructEvent method. If an error occurs during event construction, it returns a response with an error message.

// If the event type is "checkout.session.completed", it retrieves the subscription details using the stripe.subscriptions.retrieve method. It checks if the user ID is missing in the session metadata and returns a response with an error message if it is. Otherwise, it creates a new user subscription record using the prismadb.userSubscription.create method.

// If the event type is "invoice.payment_succeeded", it retrieves the subscription details and updates the existing user subscription record using the prismadb.userSubscription.update method.

// Finally, it returns a response with a status code of 200.

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is missing", { status: 400 });
        }

        await prismadb.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            }
        })
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
            }
        })
    }
    return new NextResponse(null, { status: 200 });
}