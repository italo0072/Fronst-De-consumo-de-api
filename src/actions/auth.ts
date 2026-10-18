"use server";
import { redirect } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { setToken, clearToken } from "@/lib/session";
export type FormState = { error?: string; fieldErrors?: Record<string, string[]> };
async function auth(path: string, body: object): Promise<FormState> {
  try {
    const r: any = await api(path, { method: "POST", body: JSON.stringify(body) });
    const token = r.data?.access_token;
    if (!token) return { error: "La API no devolvio token" };
    await setToken(token);
  } catch (e) {
    return e instanceof ApiError ? { error: e.message, fieldErrors: e.errors } : { error: "Error inesperado" };
  }
  redirect("/orders");
}
export async function loginAction(_: FormState, fd: FormData) {
  return auth("/auth/login", { email: fd.get("email"), password: fd.get("password") });
}
export async function registerAction(_: FormState, fd: FormData) {
  return auth("/auth/register", { name: fd.get("name"), email: fd.get("email"), password: fd.get("password"), password_confirmation: fd.get("password") });
}
export async function logoutAction() { await clearToken(); redirect("/login"); }
