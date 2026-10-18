import { Suspense } from "react";
import { redirect } from "next/navigation";
import { api, ApiError, list, Order } from "@/lib/api";
async function Orders() {
  let orders: Order[];
  try { orders = list<Order>(await api("/orders", { auth: true })); }
  catch (e) { if (e instanceof ApiError && e.status === 401) redirect("/login"); throw e; }
  if (!orders.length) return <p className="muted">Aún no tienes compras.</p>;
  return (
    <div className="card">
      {orders.map((o) => (
        <div key={o.id} className="row">
          <span>Orden #{o.id} · {o.items?.length ?? 0} producto(s)</span>
          <span>{o.status}</span>
          <span>${Number(o.total_amount).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
export default function Page() {
  return (<><h1>Historial de compras</h1><Suspense fallback={<p className="muted">Cargando órdenes…</p>}><Orders /></Suspense></>);
}
