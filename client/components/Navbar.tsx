'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useStore } from '@/context/StoreContext';

export default function Navbar() {
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState<{ id: string; title: string }[]>([]);
  const { cart } = useStore();

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!q.trim()) return setSuggestions([]);
      try {
        setSuggestions(await api(`/products/autocomplete?q=${encodeURIComponent(q)}`));
      } catch {
        setSuggestions([]);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <nav className="border-b sticky top-0 bg-white/90 backdrop-blur z-50">
      <div className="container py-3 flex items-center gap-4">
        <Link href="/" className="font-black text-xl">IPrints</Link>
        <Link href="/shop" className="text-sm">Shop</Link>
        <Link href="/admin" className="text-sm">Admin</Link>
        <div className="ml-auto relative w-full max-w-sm">
          <input className="w-full border rounded-xl px-3 py-2" placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} />
          {suggestions.length > 0 && (
            <div className="absolute w-full bg-white border rounded-xl mt-1 shadow p-2">
              {suggestions.map((s) => <Link key={s.id} href={`/product/${s.id}`} className="block p-2 hover:bg-slate-100 rounded">{s.title}</Link>)}
            </div>
          )}
        </div>
        <Link href="/cart">Cart ({cart.length})</Link>
        <Link href="/account">Account</Link>
      </div>
    </nav>
  );
}
