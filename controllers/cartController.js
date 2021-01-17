const catchAsync = require('./../utils/catchAsync');
const Cart = require('./../models/cartModel');

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({
    user: req.body.user,
  });

  res.status(200).json({
    cart,
  });
});

exports.editCart = catchAsync(async (req, res, next) => {
  const { product, user } = req.body;

  const oldCart = await Cart.findOne({ user });

  const newCartItem = {
    product: product.id,
    quantity: product.quantity || 1,
  };

  oldCart.products.push(newCartItem);

  await oldCart.save();

  res.status(200).json({
    message: 'Helo',
    oldCart,
  });
});
