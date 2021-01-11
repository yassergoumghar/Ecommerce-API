const Product = require('./../models/productModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getProducts = catchAsync(async (req, res, next) => {
  //2 Get All Products
  //? Filter Products by req.params
  const products = await Product.find();

  //2 Build Template
  //2 Pass all the products
  res.status(200).render('shop', {
    title: 'Shop Page',
    user: res.locals.user,
    products,
  });
});
