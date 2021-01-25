const mongoose = require('mongoose');

//) Order Model: Products, Price, User, Notes: By admin, Status: [ 'notConfirmed', 'confirmed', 'shipped', 'shipping', 'canceled' ].
const orderSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cart',
    required: [true, 'Order must belong to a cart'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
  notes: String,
  status: {
    type: String,
    enum: ['notConfirmed', 'confirmed', 'shipping', 'shipped', 'canceled'],
    default: 'notConfirmed',
  },
  redirected: {
    type: Boolean,
    default: false,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'cart',
    select: '-user',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
