const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Products = require('./../models/productModel');
const handleFactory = require('./handlerFactory');

exports.getAllProducts = handleFactory.getAll(Products);
exports.addProduct = handleFactory.createOne(Products);
exports.updateProduct = handleFactory.updateOne(Products);

exports.getProductBySlug = catchAsync(async (req, res, next) => {
  let { slug } = req.params;
  let query = Products.findOne({ slug });
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that slug', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const active = false;
  const doc = await Products.findByIdAndUpdate(
    req.params.id,
    { active },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(202).json({
    status: 'success',
    data: {
      message: 'Product Deleted Successfully',
    },
  });
});
