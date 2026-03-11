const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { data } = require('../utils/store');

const tokenFor = (user) => jwt.sign({ id: user._id || user.id, role: user.role, email: user.email, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  if (process.env.MONGO_URI) {
    const user = await User.create({ name, email, password: hashed });
    return res.json({ token: tokenFor(user), user: { name: user.name, email: user.email, role: user.role } });
  }

  if (data.users.find((u) => u.email === email)) return res.status(400).json({ message: 'Email exists' });
  const user = { id: `u${Date.now()}`, name, email, password: hashed, role: 'user', addresses: [], wishlist: [] };
  data.users.push(user);
  res.json({ token: tokenFor(user), user: { name, email, role: 'user' } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = process.env.MONGO_URI ? await User.findOne({ email }) : data.users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: tokenFor(user), user: { name: user.name, email: user.email, role: user.role, addresses: user.addresses || [], wishlist: user.wishlist || [] } });
};

exports.profile = async (req, res) => {
  if (process.env.MONGO_URI) {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  }
  const user = data.users.find((u) => u.id === req.user.id);
  res.json({ ...user, password: undefined });
};
