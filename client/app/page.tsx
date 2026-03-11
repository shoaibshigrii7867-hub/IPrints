import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';

export default async function HomePage() {
  const data = await api('/products?limit=12');
  const items = data.items || [];
  const featured = items.filter((p: any) => p.featured);
  const trending = items.filter((p: any) => p.trending);
  const categories = [...new Set(items.map((p: any) => p.category))];

  return (
    <main>
      <section className="bg-gradient-to-r from-primary to-indigo-400 text-white">
        <div className="container py-24 text-center">
          <h1 className="text-5xl font-black mb-4">Shop Better. Live Better.</h1>
          <p className="opacity-95">Discover trending essentials with fast delivery and seamless checkout.</p>
          <a href="/shop" className="inline-block mt-6 btn bg-white text-primary">Start Shopping</a>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{featured.map((p: any) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{trending.map((p: any) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid md:grid-cols-3 gap-4">{categories.map((c) => <a key={String(c)} href={`/shop?category=${String(c)}`} className="card p-8 text-center hover:bg-muted">{String(c)}</a>)}</div>
      </section>

      <section className="container py-6 grid md:grid-cols-2 gap-4">
        <div className="card p-8 bg-slate-900 text-white">Flash Sale up to 40% off</div>
        <div className="card p-8 bg-accent text-white">Free shipping on orders above $99</div>
      </section>

      <section className="container py-12 grid md:grid-cols-3 gap-4">
        {['Amazing quality and quick shipping!', 'Loved the design and checkout experience.', 'My go-to store for essentials.'].map((t) => (
          <div key={t} className="card p-6"><p>“{t}”</p><p className="text-xs mt-2 text-slate-500">Verified customer</p></div>
        ))}
      </section>

      <section className="container py-12 text-center">
        <h3 className="text-xl font-bold">Join our newsletter</h3>
        <p className="text-sm text-slate-600 mb-3">Get exclusive deals and product drops.</p>
        <div className="max-w-md mx-auto flex gap-2"><input className="flex-1 border rounded-xl px-3" placeholder="Email address" /><button className="btn-primary">Subscribe</button></div>
      </section>
    </main>
  );
}
