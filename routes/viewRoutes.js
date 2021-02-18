const express = require('express')
const authController = require('../controllers/authController')
const viewController = require('../controllers/viewController')
const orderController = require('../controllers/orderController')

const Order = require('./../models/orderModel')

const router = express.Router()

//) Use the is Logged in and Get the cart Middlewares
router.use(authController.isLoggedIn, viewController.getCart)

//2 GET home page
router.get('/', viewController.getOverview)

//2 Get Best Sellers, new Arrivals, Hot sales, deal of the week

//2 Get /shop: All products, filter by: Categories, Branding, Price: Low to high + high to low + between x and y... , Size (multi select), colors, tags, Pagination: Get only 20 products by 20
router.get('/products', viewController.getProducts)

// 2 Product details: get product by slug, get related products
router.get('/products/:slug', viewController.getProduct)

//2 Checkout: Update quantity, remove product, coupon codes, Add order
router.get('/checkout', viewController.getCheckout)

//2 Get: Orders Dashboard
router.get('/order/all', async (req, res, next) => {
  const orders = await Order.findOne({
    user: res.locals.user.id,
  })

  res.render('orders', {
    title: 'All Orders',
    orders,
  })
})

//2 Login Route

//2 About Us route

//2 Contact Page

//2 Get: Order added successfully. Or something went wrong.
router.get(
  '/order/status/:id',
  authController.protect,
  orderController.getOrderStatus,
  viewController.getOrderStatus
)
module.exports = router
