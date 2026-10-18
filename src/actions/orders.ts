"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api, ApiError, one } from "@/lib/api";
type Item = { product_id: number; quantity: number };
const msg = (e: unknown, d: string) => (e instanceof ApiError ? e.message : d);
function refresh() {
  revalidatePath("/orders");
  revalidatePath("/");
  revalidatePath("/products/[id]", "page");
}
export async function createOrderAction(items: Item[]) {
  try {
    const r = await api("/orders", { method: "POST", auth: true, body: JSON.stringify({ items }) });
    refresh();
    return { ok: true as const, orderId: one<{ id: number }>(r).id };
  } catch (e) { return { ok: false as const, error: msg(e, "No se pudo crear la orden") }; }
}
export async function payOrderAction(orderId: number) {
  try {
    await api("/payments/create-intent", {
      method: "POST", auth: true,
      body: JSON.stringify({ order_id: orderId, payment_method: process.env.STRIPE_TEST_PM ?? "pm_card_visa" }),
    });
    const c: any = await api(`/payments/${orderId}/confirm`, { method: "POST", auth: true });
    const status = c.data?.status;
    if (status !== "succeeded") { refresh(); return { ok: false as const, error: `El pago no se completó (estado: ${status})` }; }
  } catch (e) { return { ok: false as const, error: msg(e, "Pago fallido") }; }
  refresh();
  redirect(`/checkout/success?order=${orderId}`);
}
