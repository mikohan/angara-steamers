import { NextResponse } from "next/server";
import Stripe from "stripe";
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json(); // Expecting: [{ name: string, price: number, quantity: number }]

    const line_items = items.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} Steam Cleaning`,
        },
        unit_amount: Math.round(item.price * 100), // Convert each price to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
