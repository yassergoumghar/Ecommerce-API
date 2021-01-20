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

// ) Create a virtual property `totalPrice` computed from the sum of the product's prices
cartSchema.virtual('prices').get(function () {
  //* Initiaze the sum with 0.00
  let sum = 0;

  //* Loop through every product
  this.products.forEach((product) => {
    const { quantity } = product;
    const { price } = product.product;
    sum += price * quantity;
  });

  return sum;
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
