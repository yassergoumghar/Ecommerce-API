const dotenv = require('dotenv');
const handleFactory = require('./handlerFactory');
const Orders = require('./../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

dotenv.config({ path: './../config.env' });
const trackOrderRoute = process.env.TRACK_ORDER;

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

exports.getOrderStatus = catchAsync(async (req, res, next) => {
  //) Get the Order Id, and find It
  const { id } = req.params;
  const order = await Orders.findById(id);

  //) If no order, then it wasn't placed in the first place
  if (!order) {
    const error = new AppError(
      `It looks like your order hasn't been plalced successfuly, Plase try again.`,
      500
    );
    return next(error);
  }

  const { redirected } = order;

  if (redirected) {
    //) Check if the User has already been directed, if true, redirect him to track your order route
    return res.redirect(trackOrderRoute);
  }

  //) Edit the Order redirected property to true
  const updatedOrder = await Orders.findByIdAndUpdate(
    order.id,
    { redirected: true },
    { new: true }
  );

  //) Put the Order in the response
  req.body.order = updatedOrder;

  //) Call next
  next();
});
