import { api, one, Product } from "@/lib/api";
import AddToCart from "@/components/AddToCart";
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = one<Product>(await api(`/products/${id}`, { tags: [`product-${id}`, "products"] }));
  return (
    <div className="card">
      {p.image_url && <img src={p.image_url} alt={p.name} width={800} height={600} fetchPriority="high" />}
      <h1>{p.name}</h1><p>{p.description}</p><h2>${Number(p.price).toFixed(2)}</h2>
      <p className="muted">Stock: {p.stock}</p>
      <AddToCart id={p.id} name={p.name} price={Number(p.price)} />
    </div>
  );
}
