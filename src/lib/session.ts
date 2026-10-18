import "server-only";
import { cookies } from "next/headers";
export async function setToken(t: string) {
  (await cookies()).set("token", t, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 3600 });
}
export async function getToken() { return (await cookies()).get("token")?.value; }
export async function clearToken() { (await cookies()).delete("token"); }
