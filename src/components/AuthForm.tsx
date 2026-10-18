"use client";
import { useActionState } from "react";
import type { FormState } from "@/actions/auth";
export default function AuthForm({ action, register }: { action: (s: FormState, f: FormData) => Promise<FormState | void>; register?: boolean }) {
  const [s, fa, pending] = useActionState(async (p: FormState, f: FormData) => (await action(p, f)) ?? {}, {} as FormState);
  return (
    <form action={fa} className="card form">
      <h1>{register ? "Crear cuenta" : "Iniciar sesión"}</h1>
      {register && <input name="name" placeholder="Nombre" required />}
      <input name="email" type="email" placeholder="Correo" required />
      <input name="password" type="password" placeholder="Contraseña" required minLength={8} />
      {s.error && <p className="err">{s.error}</p>}
      {s.fieldErrors && Object.values(s.fieldErrors).flat().map((m) => <p key={m} className="err">{m}</p>)}
      <button disabled={pending}>{pending ? "Enviando…" : register ? "Registrarme" : "Entrar"}</button>
    </form>
  );
}
