const handleFactory = require('./handlerFactory');
const Orders = require('./../models/orderModel');
const AppError = require('../utils/appError');

exports.addOrder = handleFactory.createOne(Orders);
exports.getOrders = handleFactory.getAll(Orders);
exports.updateOrder = handleFactory.updateOne(Orders);

exports.getStatus = (req, _res, next) => {
  //2 Get status
  const { status } = req.body;

  //2 Check if there is no status
  if (!status) {
    return next(
      new AppError('Please enter a status to update this order', 400)
    );
  }

  //2 Edit req.body by only getting status
  req.body = { status };

  next();
};

exports.putUnconfirmed = (req, res, next) => {
  //2 Put the req.params.unconfirmed
  req.params.unconfirmed = true;

  //2 Call next
  next();
};
