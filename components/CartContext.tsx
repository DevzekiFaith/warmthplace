"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, CartTotals, computeCartTotals } from "@/lib/cart";

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totals: { itemCount: 0, subtotal: 0 },
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addItem: () => false,
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

const STORAGE_KEY = "warmthplace_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, isHydrated]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    let success = true;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > item.stock) {
          alert(`Only ${item.stock} item(s) currently available in studio inventory.`);
          success = false;
          return prev;
        }
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i));
      } else {
        if (quantity > item.stock) {
          alert(`Only ${item.stock} item(s) currently available in studio inventory.`);
          success = false;
          return prev;
        }
        return [...prev, { ...item, quantity }];
      }
    });

    if (success) {
      setIsOpen(true);
    }
    return success;
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const clamped = Math.min(quantity, i.stock);
          return { ...i, quantity: clamped };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totals = computeCartTotals(items);

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
