// app/cart/page.tsx
import type { Metadata } from "next";
import CartClient from "@/components/CartClient";

export const metadata: Metadata = {
  title: "Shopping Cart | Angara Steamers",
  description: "Manage your upholstery and carpet cleaning service packages.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  return <CartClient />;
}
