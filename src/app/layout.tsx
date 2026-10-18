import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { CartProvider } from "@/components/CartProvider";
import CartLink from "@/components/CartLink";
import { logoutAction } from "@/actions/auth";
import "./globals.css";
export const metadata: Metadata = { title: "Tienda", description: "E-commerce con Next.js y Laravel" };
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const logged = !!(await cookies()).get("token");
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <header>
            <Link href="/"><strong>Tienda</strong></Link>
            <nav>
              <CartLink />
              {logged ? (<><Link href="/orders">Mis órdenes</Link><form action={logoutAction}><button className="ghost">Salir</button></form></>)
                : (<><Link href="/login">Entrar</Link><Link href="/register">Registro</Link></>)}
            </nav>
          </header>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
