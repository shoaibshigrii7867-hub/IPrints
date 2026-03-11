const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: String,
    items: [{ productId: String, title: String, qty: Number, price: Number }],
    shipping: { name: String, email: String, address: String, city: String, zip: String, country: String },
    paymentMethod: String,
    subtotal: Number,
    total: Number,
    status: { type: String, default: 'Processing' }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
