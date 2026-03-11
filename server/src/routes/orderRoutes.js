const router = require('express').Router();
const { createOrder, myOrders, allOrders } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/my', protect, myOrders);
router.get('/', protect, adminOnly, allOrders);

module.exports = router;
