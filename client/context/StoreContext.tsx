'use client';
import { createContext, useContext, useMemo, useState } from 'react';
import { Product } from '@/lib/types';

type CartItem = Product & { qty: number; selectedColor?: string; selectedSize?: string };

const StoreCtx = createContext<any>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  const addToCart = (p: Product, qty = 1, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id && i.selectedColor === selectedColor && i.selectedSize === selectedSize);
      if (existing) return prev.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { ...p, qty, selectedColor, selectedSize }];
    });
  };

  const updateQty = (id: string, qty: number) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const toggleWishlist = (id: string) => setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.qty, 0), [cart]);

  return <StoreCtx.Provider value={{ cart, wishlist, user, setUser, addToCart, updateQty, removeFromCart, toggleWishlist, subtotal }}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);
