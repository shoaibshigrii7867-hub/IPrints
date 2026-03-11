const Review = require('../models/Review');
const { data } = require('../utils/store');

exports.createReview = async (req, res) => {
  const payload = { ...req.body, userId: req.user.id, userName: req.user.name };
  if (process.env.MONGO_URI) return res.status(201).json(await Review.create(payload));
  const review = { id: `r${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
  data.reviews.push(review);
  res.status(201).json(review);
};
