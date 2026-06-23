// @/store/useCart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  item: string;
  priceAfter: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (itemName: string, quantity: number) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
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
      clearCart: () => set({ cart: [] }),
    }),
    { name: "shopping-cart-storage" }, // Persists data inside browser localStorage safely
  ),
);
