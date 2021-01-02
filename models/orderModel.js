const mongoose = require('mongoose');

//) Order Model: Products, Price, User, Notes: By admin, Status: [ 'notConfirmed', 'confirmed', 'shipped', 'shipping', 'canceled' ].
const orderSchema = new mongoose.Schema({});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
