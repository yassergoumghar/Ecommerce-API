const express = require('express')
const cartController = require('../controllers/cartController')
const authController = require('../controllers/authController')

const router = express.Router()

//2 Protecred route
router.use(authController.protect, authController.getUser)

//& Get my cart
router.get('/cart', cartController.getCart)

//& Add a new Product to the cart
router.patch('/product', cartController.editCart)

module.exports = router
