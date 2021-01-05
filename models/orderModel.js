const mongoose = require('mongoose');

//) Order Model: Products, Price, User, Notes: By admin, Status: [ 'notConfirmed', 'confirmed', 'shipped', 'shipping', 'canceled' ].
const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Order must belong to a product.'],
    },
  ],
  price: Number,
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
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'products',
    select: 'name pictures slug',
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
