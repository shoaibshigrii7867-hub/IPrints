const Product = require('../models/Product');
const { readProducts } = require('../utils/store');

const sortMap = {
  newest: (a, b) => String(b.id || b._id).localeCompare(String(a.id || a._id)),
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  popularity: (a, b) => (b.popularity || 0) - (a.popularity || 0)
};

exports.list = async (req, res) => {
  const { q = '', category = 'all', sort = 'newest', page = 1, limit = 8 } = req.query;
  let items = process.env.MONGO_URI ? await Product.find() : readProducts();
  items = items.filter((p) => (category === 'all' || p.category === category) && p.title.toLowerCase().includes(String(q).toLowerCase()));
  items.sort(sortMap[sort] || sortMap.newest);
  const start = (Number(page) - 1) * Number(limit);
  const paged = items.slice(start, start + Number(limit));
  res.json({ items: paged, total: items.length, page: Number(page), pages: Math.ceil(items.length / Number(limit)) });
};

exports.autocomplete = async (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const items = (process.env.MONGO_URI ? await Product.find() : readProducts())
    .filter((p) => p.title.toLowerCase().includes(q))
    .slice(0, 6)
    .map((p) => ({ id: p._id || p.id, title: p.title }));
  res.json(items);
};

exports.single = async (req, res) => {
  const id = req.params.id;
  const items = process.env.MONGO_URI ? await Product.find() : readProducts();
  const product = items.find((p) => String(p._id || p.id) === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.create = async (req, res) => {
  if (process.env.MONGO_URI) return res.json(await Product.create(req.body));
  res.status(201).json({ ...req.body, id: `p${Date.now()}` });
};

exports.update = async (req, res) => {
  if (process.env.MONGO_URI) return res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  res.json({ ...req.body, id: req.params.id });
};

exports.remove = async (req, res) => res.json({ message: `Deleted product ${req.params.id}` });
