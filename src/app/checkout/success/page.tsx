import Link from "next/link";
import ClearCart from "@/components/ClearCart";
export default async function Success({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return (<div className="card"><ClearCart /><h1>¡Compra confirmada!</h1><p>Orden #{order ?? "—"} pagada correctamente.</p><Link href="/orders">Ver mis órdenes</Link></div>);
}
