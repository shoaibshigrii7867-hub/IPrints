'use client';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [draft, setDraft] = useState({ title: '', category: 'Apparel', price: 0, stock: 0, description: '', rating: 4.5, reviewsCount: 0, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200'], colors: ['Black'], sizes: ['M'] });

  const refresh = async () => {
    const p = await api('/products?limit=50');
    setProducts(p.items);
    try {
      setOrders(await api('/orders'));
      setAnalytics(await api('/admin/analytics'));
    } catch {}
  };

  useEffect(() => { refresh(); }, []);

  const addProduct = async (e: FormEvent) => {
    e.preventDefault();
    await api('/products', { method: 'POST', body: JSON.stringify(draft) });
    refresh();
  };

  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-3xl font-black">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-3">{['sales', 'users', 'orders', 'inventory'].map((k) => <div key={k} className="card p-4"><p className="text-xs uppercase">{k}</p><p className="text-2xl font-bold">{analytics?.[k] ?? '-'}</p></div>)}</div>
      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={addProduct} className="card p-5 space-y-2">
          <h2 className="font-bold">Add Product</h2>
          <input className="w-full border rounded px-3 py-2" placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-2"><input className="border rounded px-3 py-2" type="number" placeholder="Price" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} /><input className="border rounded px-3 py-2" type="number" placeholder="Stock" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })} /></div>
          <button className="btn-primary">Create Product</button>
        </form>
        <div className="card p-5"><h2 className="font-bold mb-3">Manage Orders</h2>{orders.length ? orders.map((o) => <p key={o.id || o._id}>#{o.id || o._id} - {o.status} - ${o.total}</p>) : <p>No orders available</p>}</div>
      </div>
      <div className="card p-5"><h2 className="font-bold mb-3">Product Inventory</h2><div className="space-y-2">{products.map((p) => <div key={p.id} className="flex justify-between border-b pb-2"><p>{p.title}</p><p>Stock: {p.stock}</p></div>)}</div></div>
    </main>
  );
}
