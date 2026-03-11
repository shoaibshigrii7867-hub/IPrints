'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const { cart, updateQty, removeFromCart, subtotal } = useStore();
  const [coupon, setCoupon] = useState('');
  const discount = coupon === 'SAVE10' ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item: any) => (
            <div key={item.id} className="card p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm">${item.price} · {item.selectedColor} · {item.selectedSize}</p>
              </div>
              <input type="number" min={1} value={item.qty} onChange={(e) => updateQty(item.id, Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
              <button className="btn border" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="card p-5 h-fit">
          <h3 className="font-bold text-lg mb-3">Summary</h3>
          <input className="w-full border rounded-xl px-3 py-2 mb-2" placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          <div className="space-y-1 text-sm">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Discount: -${discount.toFixed(2)}</p>
            <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
          </div>
          <Link href="/checkout" className="btn-primary w-full mt-4 inline-block text-center">Proceed to Checkout</Link>
        </div>
      </div>
    </main>
  );
}
