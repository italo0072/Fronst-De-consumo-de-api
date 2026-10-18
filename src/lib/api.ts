import "server-only";
import { getToken } from "./session";
export type Product = { id: number; name: string; price: number | string; description?: string; image_url?: string | null; stock?: number };
export type Order = { id: number; status: string; total_amount: number | string; created_at?: string; items?: { id: number; product_name: string; quantity: number; subtotal: number | string }[] };
export class ApiError extends Error {
  constructor(public status: number, message: string, public errors?: Record<string, string[]>) { super(message); }
}
export async function api<T>(path: string, o: RequestInit & { auth?: boolean; tags?: string[] } = {}): Promise<T> {
  const { auth, tags, ...init } = o;
  const h = new Headers(init.headers);
  h.set("Accept", "application/json");
  if (init.body) h.set("Content-Type", "application/json");
  if (auth) { const t = await getToken(); if (t) h.set("Authorization", `Bearer ${t}`); }
  const res = await fetch(`${process.env.API_BASE_URL}${path}`, { ...init, headers: h, cache: tags ? undefined : "no-store", next: tags ? { tags } : undefined });
  const d = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, d.message ?? "Error de la API", d.errors);
  return d as T;
}
export const list = <T,>(r: any): T[] => (Array.isArray(r) ? r : r?.data ?? []);
export const one = <T,>(r: any): T => (r?.data ?? r) as T;
