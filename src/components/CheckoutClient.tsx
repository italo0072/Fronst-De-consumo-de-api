"use client";
import { useState, useTransition } from "react";
import { useCart } from "./CartProvider";
import { createOrderAction, payOrderAction } from "@/actions/orders";
export default function CheckoutClient() {
  const { items, total, dispatch } = useCart();
  const [err, setErr] = useState("");
  const [pending, start] = useTransition();
  if (!items.length) return <p>Tu carrito está vacío.</p>;
  const pay = () => start(async () => {
    setErr("");
    const o = await createOrderAction(items.map((i) => ({ product_id: i.id, quantity: i.quantity })));
    if (!o.ok) return setErr(o.error);
    const p = await payOrderAction(o.orderId);
    if (p && !p.ok) return setErr(p.error);
  });
  return (
    <div className="card">
      {items.map((i) => (
        <div key={i.id} className="row"><span>{i.name} × {i.quantity}</span><span>${(i.price * i.quantity).toFixed(2)}</span>
          <button className="ghost" onClick={() => dispatch({ t: "remove", id: i.id })}>Quitar</button></div>
      ))}
      <h2>Total: ${total.toFixed(2)}</h2>
      {err && <p className="err">{err}</p>}
      <button onClick={pay} disabled={pending}>{pending ? "Procesando pago…" : "Crear orden y pagar"}</button>
    </div>
  );
}
