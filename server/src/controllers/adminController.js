const { data, readProducts } = require('../utils/store');

exports.analytics = async (_req, res) => {
  const products = readProducts();
  const orders = data.orders;
  const users = data.users;
  const sales = orders.reduce((acc, order) => acc + Number(order.total || 0), 0);

  res.json({
    sales,
    users: users.length,
    orders: orders.length,
    inventory: products.reduce((acc, p) => acc + Number(p.stock || 0), 0)
  });
};
