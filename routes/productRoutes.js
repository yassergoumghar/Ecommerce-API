const express = require('express');

const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');

const router = express.Router();

//2 Get All Prodcuts, Get a product by slug
router.get('/all', productController.getAllProducts);
router.get('/product/:slug', productController.getProductBySlug);

//! Protect for admin only, add it when auth route is defined
// router.use(
//   authController.protect,
//   authController.restrictTo('employee', 'accountant', 'admin')
// );

//5 Post, Patch, Delete: A product by id
router.post('/product', productController.addProduct);

router
  .route('/product/:id')
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
