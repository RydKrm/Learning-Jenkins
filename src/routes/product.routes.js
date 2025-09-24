
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

// For a real app, you would add authentication middleware to protected routes

router.route('/').get(getAllProducts).post(createProduct); // POST should be protected
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct); // PUT and DELETE should be protected

module.exports = router;
