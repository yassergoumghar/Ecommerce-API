const mongoose = require('mongoose');

//) Order Model:
const cartSchema = new mongoose.Schema({
  products: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a user'],
    unique: true,
  },
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'products',
    populate: {
      path: 'product',
      model: 'Product',
    },
    select: 'name pictures slug',
  });

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
