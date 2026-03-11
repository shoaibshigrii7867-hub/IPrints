const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    category: String,
    price: Number,
    compareAtPrice: Number,
    rating: Number,
    reviewsCount: Number,
    stock: Number,
    popularity: Number,
    images: [String],
    colors: [String],
    sizes: [String],
    featured: Boolean,
    trending: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
