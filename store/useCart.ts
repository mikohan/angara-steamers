// @/store/useCart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  item: string;
  priceAfter: number;
  quantity: number;
}

// Fabric protection (Scotchgard): priced as a share of the whole order.
export const PROTECTION_RATE = 0.3;
export const PROTECTION_LABEL = "Fabric protection (Scotchgard)";

export function cartTotals(cart: CartItem[], protection: boolean) {
  const subtotal = cart.reduce((sum, i) => sum + i.priceAfter * i.quantity, 0);
  const protectionCost = protection ? Math.round(subtotal * PROTECTION_RATE) : 0;
  return { subtotal, protectionCost, total: subtotal + protectionCost };
}

interface CartState {
  cart: CartItem[];
  protection: boolean;
  setProtection: (on: boolean) => void;
  addToCart: (product: CartItem) => void;
  updateQuantity: (itemName: string, quantity: number) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      protection: false,
      setProtection: (on) => set({ protection: on }),
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((i) => i.item === product.item);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.item === product.item
                  ? { ...i, quantity: i.quantity + product.quantity }
                  : i,
              ),
            };
          }
          return { cart: [...state.cart, product] };
        }),
      updateQuantity: (itemName, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.item === itemName ? { ...i, quantity: Math.max(1, quantity) } : i,
          ),
        })),
      removeFromCart: (itemName) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.item !== itemName),
        })),
      clearCart: () => set({ cart: [], protection: false }),
    }),
    { name: "shopping-cart-storage" }, // Persists data inside browser localStorage safely
  ),
);
