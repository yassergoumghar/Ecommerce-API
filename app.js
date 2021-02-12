const path = require('path')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const passport = require('passport')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

//) Routers
const productRouter = require('./routes/productRoutes')
const orderRouter = require('./routes/orderRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const authRouter = require('./routes/authRoutes')
const viewRouter = require('./routes/viewRoutes')
const cartRouter = require('./routes/cartRouter')
const likeRouter = require('./routes/likeRouter')

const app = express()

//) view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'dist')))
// Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//     ],
//   })
// );

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.cookies)
  next()
})

//) Passport Middleware
app.use(passport.initialize())

//) 3) ROUTES
//? Products
app.use('/api/v1/products', productRouter)
//? Orders, add promocode functionnality
app.use('/api/v1/orders', orderRouter)
//? Carts
app.use('/api/v1/carts', cartRouter)
//? Likes or Wishlist
// app.use('/api/v1/likes', likeRouter);
//? Authentification
app.use('/api/v1/auth', authRouter)
//? Reviews
app.use('/api/v1/reviews', reviewRouter)
//? Index
app.use('/', viewRouter)

//) 404 not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
