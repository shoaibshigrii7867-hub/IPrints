const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, '../../data/products.json');

const data = {
  users: [
    { id: 'u1', name: 'Admin User', email: 'admin@iprints.com', password: '$2a$10$2uUCCqTXQp5h4w6f.D5XQewmf31EapVpDsPJ65wQkvo4Ct.wV9txe', role: 'admin', addresses: [], wishlist: [] }
  ],
  orders: [],
  reviews: []
};

const readProducts = () => JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

module.exports = { data, readProducts };
