const AppError = require('../utils/appError')
const Orders = require('../models/orderModel')
const catchAsync = require('../utils/catchAsync')

exports.checkOrder = catchAsync(async (req, res, next) => {
  //2 Get the user, his orders and the reviewed product
  const { product, order } = req.body
  const userOrder = await Orders.findById(order)

  //2 check if one of the orders contain the reviewed product
  const { products } = userOrder
  const productBought = products.map(prod => prod._id).includes(product)

  //2 If it doesn't, return next(err)
  if (!productBought) {
    return next(
      new AppError('Please buy this product in order to give it a review', 400)
    )
  }

  //2 else, return next
  next()
})
