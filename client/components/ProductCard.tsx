'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useStore } from '@/context/StoreContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  return (
    <div className="card overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <Image src={product.images[0]} alt={product.title} width={500} height={500} className="h-56 w-full object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-xs text-slate-500">{product.category}</p>
        <div className="my-2 font-bold">${product.price}</div>
        <div className="flex gap-2">
          <button className="btn-primary text-sm" onClick={() => addToCart(product)}>Add to cart</button>
          <button className="btn border text-sm" onClick={() => toggleWishlist(product.id)}>{wishlist.includes(product.id) ? '♥' : '♡'}</button>
        </div>
      </div>
    </div>
  );
}
