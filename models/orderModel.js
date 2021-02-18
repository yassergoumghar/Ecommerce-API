const mongoose = require('mongoose')

//) Order Model: Products, Price, User, Notes: By admin, Status: [ 'notConfirmed', 'confirmed', 'shipped', 'shipping', 'canceled' ].
const orderSchema = new mongoose.Schema({
  orders: [
    {
      cart: {
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
            orderedAt: {
              type: Date,
              default: Date.now(),
            },
          },
        ],
      },
      status: {
        type: String,
        enum: ['notConfirmed', 'confirmed', 'shipping', 'shipped', 'canceled'],
        default: 'notConfirmed',
      },
      notes: String,
      redirected: {
        type: Boolean,
        default: false,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
  ordered: {
    type: Boolean,
    default: false,
  },
})

orderSchema.pre(/^find/, function (next) {
  //2 Populate the User and the Orders.
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'orders',
    populate: {
      path: 'cart.products',
      populate: {
        path: 'product',
        model: 'Product',
      },
    },
  })

  next()
})

const Order = mongoose.model('Orders', orderSchema)

module.exports = Order
