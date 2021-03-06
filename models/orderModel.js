const mongoose = require('mongoose')

//) Order Model: Products, Price, User, Notes: By admin, Status: [ 'notConfirmed', 'confirmed', 'shipped', 'shipping', 'canceled' ].
const orderSchema = new mongoose.Schema({
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
  orderedAt: {
    type: Date,
    default: Date.now(),
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
})

orderSchema.pre(/^find/, function (next) {
  //2 Populate the User and the Orders.
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'products.product',
  })

  next()
})

const Order = mongoose.model('Orders', orderSchema)

module.exports = Order
