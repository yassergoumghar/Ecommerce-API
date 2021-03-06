const express = require('express')
const authController = require('../controllers/authController')
const viewController = require('../controllers/viewController')
const orderController = require('../controllers/orderController')

const router = express.Router()

////FEATURE Use the is Logged in and Get the cart Middlewares
router.use(authController.isLoggedIn, viewController.getCart)

//FEATURE GET home page
router.get('/', viewController.getOverview)

//FEATURE Get Login Page
router.get('/login', viewController.getLogin)

//FEATURE Get Best Sellers, new Arrivals, Hot sales, deal of the week

//FEATURE Get /shop: All products, filter by: Categories, Branding, Price: Low to high + high to low + between x and y... , Size (multi select), colors, tags, Pagination: Get only 20 products by 20
router.get('/products', viewController.getProducts)

//FEATURE Product details: get product by slug, get related products
router.get('/products/:slug', viewController.getProduct)

//FEATURE Checkout: Update quantity, remove product, coupon codes, Add order
router.get('/checkout', viewController.getCheckout)

//FEATURE Get: Orders Dashboard
router.get('/order/all', viewController.getOrders)

//FEATURE Login Route

//FEATURE About Us route

//FEATURE Contact Page

//FEATURE Get: Order added successfully. Or something went wrong.
router.get(
  '/order/status/:id',
  authController.protect,
  orderController.getOrderStatus,
  viewController.getOrderStatus
)
module.exports = router
