'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';

export default function ShopPage() {
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    api(`/products?q=${q}&category=${category}&sort=${sort}&page=${page}&limit=8`).then((res) => {
      setItems(res.items);
      setPages(res.pages);
    });
  }, [q, category, sort, page]);

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <input placeholder="Search" className="border rounded-xl px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="border rounded-xl px-3" value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">All Categories</option><option>Apparel</option><option>Footwear</option><option>Accessories</option></select>
        <select className="border rounded-xl px-3" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Newest</option><option value="popularity">Popularity</option><option value="price_asc">Price: Low to High</option><option value="price_desc">Price: High to Low</option></select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      <div className="flex justify-center gap-2 mt-8">
        <button className="btn border" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <span className="px-3 py-2">{page} / {pages}</span>
        <button className="btn border" onClick={() => setPage((p) => Math.min(pages, p + 1))}>Next</button>
      </div>
    </main>
  );
}
