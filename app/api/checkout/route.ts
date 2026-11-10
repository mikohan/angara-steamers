import { NextResponse } from "next/server";
import Stripe from "stripe";
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

export async function POST(req: Request) {
  try {
    const { items, protection } = await req.json(); // items: [{ name, price, quantity }], protection: boolean

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

    // Fabric protection (Scotchgard) = 30% of the items total
    if (protection === true) {
      const itemsTotal = (items as CartItem[]).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const protectionCost = Math.round(itemsTotal * 0.3);
      if (protectionCost > 0) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: { name: "Fabric protection (Scotchgard)" },
            unit_amount: protectionCost * 100,
          },
          quantity: 1,
        });
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
