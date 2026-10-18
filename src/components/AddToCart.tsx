"use client";
import { useCart } from "./CartProvider";
export default function AddToCart({ id, name, price }: { id: number; name: string; price: number }) {
  const { dispatch } = useCart();
  return <button onClick={() => dispatch({ t: "add", i: { id, name, price } })}>Agregar al carrito</button>;
}
