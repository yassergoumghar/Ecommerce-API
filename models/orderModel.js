const mongoose = require('mongoose')

//) Order Model: Products, Price, User, Notes: By admin, Status: [ 'notConfirmed', 'confirmed', 'shipped', 'shipping', 'canceled' ].
const orderSchema = new mongoose.Schema({
  orders: [
    {
      cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'Cart',
        required: [true, 'Order Must have a Cart'],    
      },
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
    path: 'orders.cart',
    select: '-user',
  })



  next()
})

const Order = mongoose.model('Orders', orderSchema)

module.exports = Order
