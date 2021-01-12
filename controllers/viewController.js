const Product = require('./../models/productModel');
const handlerFactory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getProducts = catchAsync(async (req, res, next) => {
  //) To Retreive only not confirmed orders.
  let filter = {};
  if (req.params.unconfirmed) filter = { status: { $eq: 'notConfirmed' } };

  const features = new APIFeatures(Product.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  //2 Build Template
  //2 Pass all the products
  res.status(200).render('shop', {
    title: 'Shop Page',
    user: res.locals.user,
    products,
    length: products.length,
  });
});
