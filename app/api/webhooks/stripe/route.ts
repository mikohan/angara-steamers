import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendEmail } from "@/lib/email";
import { sendPaidOrderToGhl } from "@/lib/ghl";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  const to_email =
    process.env.NEXT_PUBLIC_COMPANY_MANAGER_EMAIL || "angaralabllc@gmail.com";

  let event: Stripe.Event;

  // 1. Verify the event came from Stripe
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // 2. Handle the successful payment event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Fetch items the customer bought
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // 3. Prepare and send the email
    const emailBody = `
      <h1>New Booking: Angara Streamers</h1>
      <p><strong>Customer:</strong> ${session.customer_details?.email}</p>
      <h3>Order Details:</h3>
      <ul>
        ${lineItems.data
          .map(
            (item) => `
          <li>${item.description} - $${(item.amount_total! / 100).toFixed(0)}</li>
        `,
          )
          .join("")}
      </ul>
      <p><strong>Total Paid:</strong> $${(session.amount_total! / 100).toFixed(0)}</p>
    `;

    await Promise.all([
      sendEmail(
        "New Booking Angara Steamers", // subject
        emailBody, // html
        undefined, // meta (not needed here)
        undefined, // to (uses default env var)
        undefined, // from (uses default env var)
      ),
      sendPaidOrderToGhl({
        name: session.customer_details?.name ?? "",
        email: session.customer_details?.email ?? "",
        phone: session.customer_details?.phone ?? "",
        items: lineItems.data.map((item) => ({
          description: item.description ?? "Item",
          quantity: item.quantity ?? 1,
          amount: (item.amount_total ?? 0) / 100,
        })),
        total: (session.amount_total ?? 0) / 100,
        stripeSessionId: session.id,
      }),
    ]);
  }

  // 4. Always respond with 200 to acknowledge receipt
  return NextResponse.json({ received: true });
}
