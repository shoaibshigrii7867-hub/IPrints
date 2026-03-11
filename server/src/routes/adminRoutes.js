const router = require('express').Router();
const { analytics } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/analytics', protect, adminOnly, analytics);

module.exports = router;
