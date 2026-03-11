'use client';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';
import { useStore } from '@/context/StoreContext';

export default function CheckoutPage() {
  const { cart, subtotal } = useStore();
  const [done, setDone] = useState<any>(null);
  const [shipping, setShipping] = useState({ name: '', email: '', address: '', city: '', zip: '', country: '' });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const total = subtotal;
    const order = await api('/orders', { method: 'POST', body: JSON.stringify({ items: cart.map((c: any) => ({ productId: c.id, title: c.title, qty: c.qty, price: c.price })), shipping, paymentMethod, subtotal, total }) });
    setDone(order);
  };

  if (done) return <main className="container py-20 text-center"><h1 className="text-3xl font-black">Order Confirmed 🎉</h1><p className="mt-3">Order ID: {done.id || done._id}</p></main>;

  return (
    <main className="container py-10 grid md:grid-cols-2 gap-8">
      <form className="card p-6 space-y-3" onSubmit={submit}>
        <h1 className="text-2xl font-bold">Secure Checkout</h1>
        {Object.keys(shipping).map((k) => <input key={k} required className="w-full border rounded-xl px-3 py-2" placeholder={k[0].toUpperCase() + k.slice(1)} value={(shipping as any)[k]} onChange={(e) => setShipping((s) => ({ ...s, [k]: e.target.value }))} />)}
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border rounded-xl px-3 py-2"><option>Credit Card</option><option>PayPal</option><option>Cash on Delivery</option></select>
        <button className="btn-primary">Place Order</button>
      </form>
      <div className="card p-6 h-fit">
        <h3 className="text-xl font-bold mb-2">Order Summary</h3>
        {cart.map((i: any) => <p key={i.id} className="text-sm">{i.title} × {i.qty} - ${(i.price * i.qty).toFixed(2)}</p>)}
        <p className="mt-3 font-bold">Total: ${subtotal.toFixed(2)}</p>
      </div>
    </main>
  );
}
