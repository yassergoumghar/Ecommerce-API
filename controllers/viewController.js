const Product = require('./../models/productModel')
const Cart = require('./../models/cartModel')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('./../utils/apiFeatures')
const AppError = require('../utils/appError')

const getQueries = url => {
  const [, query] = url.split(/\/products\??/g)
  return query
}

const filterCart = cart =>
  cart.products?.filter(product => product?.ordered !== true)

exports.getCart = catchAsync(async (req, res, next) => {
  const { user } = res.locals

  if (user) {
    //2 Get the User id
    const userId = user.id

    //2 Find the cart by the User id
    const cart = await Cart.findOne({ user: userId })

    //2 Filter Cart *remove ordered products*
    cart.products = filterCart(cart)

    //2 Put the cart in the user object
    res.locals.user.cart = cart
  }

  next()
})

exports.getOverview = (req, res, next) => {
  const { user } = res.locals

  res.status(200).render('index', {
    title: 'Home Page',
    user,
  })
}

exports.getProducts = catchAsync(async (req, res, next) => {
  //* Skipped Pagination to do it on the Front-End
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
  const products = await features.query

  const queries = getQueries(req.originalUrl)

  //2 Build Template
  //2 Pass all the products
  res.status(200).render('shop', {
    title: 'Shop Page',
    user: res.locals.user,
    products,
    length: products.length,
    page: req.query.page,
    queries,
  })
})

exports.getProduct = catchAsync(async (req, res, next) => {
  const { slug } = req.params
  let query = Product.findOne({ slug }).populate('reviews')
  const doc = await query

  if (!doc) {
    return next(new AppError('No document found with that slug', 404))
  }

  res.status(200).render('product', {
    title: 'Shop Page',
    user: res.locals.user,
    product: doc,
  })
})

exports.getOrderStatus = (req, res, next) => {
  res.status(200).render('successfulOrder')
}

exports.getCheckout = (req, res, next) => {
  const { user } = res.locals
  const { cart } = user

  //) Check if there is no User, redirect to Login
  if (!user) return res.redirect('/login')

  //) Check if there is no product in cart, render Please add something to your Cart
  const cartEmpty = cart.products.length === 0
  if (cartEmpty) {
    return res.status(200).render('emptyCart', {
      title: 'Shoping Cart',
      message:
        'Oops, Looks like your cart is empty, Please add items to your cart then proceed to checkout !',
    })
  }

  res.status(200).render('cart', {
    title: 'Shoping Cart',
    user,
  })
}
