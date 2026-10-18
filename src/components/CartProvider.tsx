"use client";
import { createContext, useContext, useEffect, useReducer, useState, ReactNode } from "react";
export type CartItem = { id: number; name: string; price: number; quantity: number };
type A = { t: "add"; i: Omit<CartItem, "quantity"> } | { t: "remove"; id: number } | { t: "clear" } | { t: "load"; s: CartItem[] };
function red(s: CartItem[], a: A): CartItem[] {
  switch (a.t) {
    case "load": return a.s;
    case "clear": return [];
    case "remove": return s.filter((x) => x.id !== a.id);
    case "add": return s.some((x) => x.id === a.i.id) ? s.map((x) => (x.id === a.i.id ? { ...x, quantity: x.quantity + 1 } : x)) : [...s, { ...a.i, quantity: 1 }];
  }
}
const Ctx = createContext<{ items: CartItem[]; total: number; count: number; dispatch: (a: A) => void } | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(red, []);
  const [ready, setReady] = useState(false);
  useEffect(() => { try { dispatch({ t: "load", s: JSON.parse(localStorage.getItem("cart") ?? "[]") }); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("cart", JSON.stringify(items)); }, [items, ready]);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return <Ctx.Provider value={{ items, total, count, dispatch }}>{children}</Ctx.Provider>;
}
export const useCart = () => { const c = useContext(Ctx); if (!c) throw new Error("CartProvider ausente"); return c; };
