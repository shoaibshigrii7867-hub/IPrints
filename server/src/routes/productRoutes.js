const router = require('express').Router();
const { list, single, create, update, remove, autocomplete } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', list);
router.get('/autocomplete', autocomplete);
router.get('/:id', single);
router.post('/', protect, adminOnly, create);
router.put('/:id', protect, adminOnly, update);
router.delete('/:id', protect, adminOnly, remove);

module.exports = router;
