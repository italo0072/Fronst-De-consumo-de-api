import { Suspense } from "react";
import Link from "next/link";
import { api, list, Product } from "@/lib/api";
async function ProductList() {
  const products = list<Product>(await api("/products", { tags: ["products"] }));
  if (!products.length) return <p className="muted">No hay productos todavía.</p>;
  return (
    <div className="grid">
      {products.map((p) => (
        <Link key={p.id} href={`/products/${p.id}`} className="card">
          {p.image_url && <img src={p.image_url} alt={p.name} loading="lazy" width={400} height={300} />}
          <h3>{p.name}</h3><p>${Number(p.price).toFixed(2)}</p>
        </Link>
      ))}
    </div>
  );
}
export default function Home() {
  return (<><h1>Catálogo</h1><Suspense fallback={<p className="muted">Cargando productos…</p>}><ProductList /></Suspense></>);
}
