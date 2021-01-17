const Product = require('./../models/productModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('../utils/appError');

const getQueries = (url) => {
  const [, query] = url.split(/\/products\??/g);
  return query;
};

exports.getProducts = catchAsync(async (req, res, next) => {
  //* Skipped Pagination to do it on the Front-End
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const products = await features.query;

  const queries = getQueries(req.originalUrl);

  //2 Build Template
  //2 Pass all the products
  res.status(200).render('shop', {
    title: 'Shop Page',
    user: res.locals.user,
    products,
    length: products.length,
    page: req.query.page,
    queries,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  let query = Product.findOne({ slug }).populate('reviews');
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that slug', 404));
  }

  res.status(200).render('product', {
    title: 'Shop Page',
    user: res.locals.user,
    product: doc,
  });
});
