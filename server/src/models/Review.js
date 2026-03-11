const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    rating: Number,
    comment: String
  },
  { timestamps: true }
);

module.exports = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
