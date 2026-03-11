const Order = require('../models/Order');
const { data } = require('../utils/store');

exports.createOrder = async (req, res) => {
  if (process.env.MONGO_URI) {
    const order = await Order.create({ ...req.body, userId: req.user.id });
    return res.status(201).json(order);
  }
  const order = { id: `o${Date.now()}`, ...req.body, userId: req.user.id, status: 'Processing', createdAt: new Date().toISOString() };
  data.orders.push(order);
  res.status(201).json(order);
};

exports.myOrders = async (req, res) => {
  if (process.env.MONGO_URI) return res.json(await Order.find({ userId: req.user.id }));
  res.json(data.orders.filter((o) => o.userId === req.user.id));
};

exports.allOrders = async (req, res) => {
  if (process.env.MONGO_URI) return res.json(await Order.find());
  res.json(data.orders);
};
