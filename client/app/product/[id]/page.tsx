'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';
import { useStore } from '@/context/StoreContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const { addToCart } = useStore();

  useEffect(() => {
    api(`/products/${id}`).then((p) => {
      setProduct(p);
      setColor(p.colors?.[0] || '');
      setSize(p.sizes?.[0] || '');
      api(`/products?category=${p.category}`).then((r) => setRelated(r.items.filter((it: any) => it.id !== p.id).slice(0, 4)));
    });
  }, [id]);

  if (!product) return <main className="container py-12">Loading...</main>;

  return (
    <main className="container py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <Image src={product.images[0]} alt={product.title} width={700} height={700} className="w-full rounded-2xl object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-sm text-slate-500 my-2">⭐ {product.rating} ({product.reviewsCount} reviews)</p>
          <p className="text-2xl font-black mb-4">${product.price}</p>
          <p className="text-slate-600">{product.description}</p>
          <div className="mt-4"><p className="font-semibold">Color</p><div className="flex gap-2 mt-2">{product.colors.map((c: string) => <button key={c} className={`btn border ${color === c ? 'border-primary' : ''}`} onClick={() => setColor(c)}>{c}</button>)}</div></div>
          <div className="mt-4"><p className="font-semibold">Size</p><div className="flex gap-2 mt-2">{product.sizes.map((s: string) => <button key={s} className={`btn border ${size === s ? 'border-primary' : ''}`} onClick={() => setSize(s)}>{s}</button>)}</div></div>
          <div className="flex gap-3 mt-6">
            <button className="btn-primary" onClick={() => addToCart(product, 1, color, size)}>Add to cart</button>
            <button className="btn border" onClick={() => { addToCart(product, 1, color, size); router.push('/checkout'); }}>Buy now</button>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-4">Related Products</h2>
      <div className="grid md:grid-cols-4 gap-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </main>
  );
}
