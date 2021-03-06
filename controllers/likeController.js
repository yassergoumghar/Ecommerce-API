const handleFactory = require('./handlerFactory')
const Orders = require('../models/orderModel')

exports.addLike = handleFactory.createOne(Orders)
exports.getOrders = handleFactory.getAll(Orders)
exports.updateOrder = handleFactory.updateOne(Orders)
