'use client';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';
import { useStore } from '@/context/StoreContext';

export default function AccountPage() {
  const { user, setUser, wishlist } = useStore();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [orders, setOrders] = useState<any[]>([]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = isSignup ? '/auth/signup' : '/auth/login';
    const res = await api(endpoint, { method: 'POST', body: JSON.stringify(form) });
    localStorage.setItem('token', res.token);
    setUser(res.user);
    try { setOrders(await api('/orders/my')); } catch {}
  };

  if (user) {
    return (
      <main className="container py-10 grid md:grid-cols-3 gap-4">
        <div className="card p-5"><h1 className="text-xl font-bold">Dashboard</h1><p>{user.name}</p><p>{user.email}</p></div>
        <div className="card p-5"><h2 className="font-bold mb-2">Order History</h2>{orders.length ? orders.map((o) => <p key={o.id || o._id}>#{o.id || o._id} · ${o.total}</p>) : <p>No orders yet</p>}</div>
        <div className="card p-5"><h2 className="font-bold mb-2">Wishlist</h2><p>{wishlist.length} saved item(s)</p><h3 className="font-bold mt-3">Saved Addresses</h3><p className="text-sm text-slate-500">Address book connected to profile model.</p></div>
      </main>
    );
  }

  return (
    <main className="container py-20 max-w-md">
      <form onSubmit={submit} className="card p-6 space-y-3">
        <h1 className="text-2xl font-bold">{isSignup ? 'Create account' : 'Login'}</h1>
        {isSignup && <input className="w-full border rounded-xl px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border rounded-xl px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary w-full">{isSignup ? 'Sign Up' : 'Login'}</button>
        <button type="button" className="text-sm underline" onClick={() => setIsSignup((v) => !v)}>{isSignup ? 'Have an account? Login' : 'Need an account? Sign up'}</button>
      </form>
    </main>
  );
}
