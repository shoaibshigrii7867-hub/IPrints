export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-slate-50">
      <div className="container py-10 grid md:grid-cols-4 gap-6 text-sm">
        <div><h4 className="font-bold mb-2">IPrints</h4><p>Modern eCommerce for premium lifestyle products.</p></div>
        <div><h4 className="font-bold mb-2">Links</h4><ul className="space-y-1"><li>Shop</li><li>About</li><li>Contact</li></ul></div>
        <div><h4 className="font-bold mb-2">Contact</h4><p>support@iprints.com</p><p>+1 (555) 321-9087</p></div>
        <div><h4 className="font-bold mb-2">Social</h4><p>Instagram · X · Facebook</p></div>
      </div>
    </footer>
  );
}
