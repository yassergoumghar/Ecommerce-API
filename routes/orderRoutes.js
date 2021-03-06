const express = require('express')
const orderController = require('../controllers/orderController')
const authController = require('../controllers/authController')

const router = express.Router()

//2 Protecred route. Get current user from req.user and add it to req.body.user
router.use(authController.protect, authController.getUser)

//& Post: Add a new order.
router.post('/new', orderController.addOrder)

//2 Protected route: Only by admin
router.use(authController.restrictTo('employee', 'accountant', 'admin'))

//& Protect by Admin: Get: Get all orders, Patch: Edit status and notes
router.get('/all', orderController.getOrders)
router.patch(
  '/order/:id',
  orderController.getStatus,
  orderController.updateOrder
)

//7 Get new Orders
router.get(
  '/unconfirmed',
  orderController.putUnconfirmed,
  orderController.getOrders
)

module.exports = router
