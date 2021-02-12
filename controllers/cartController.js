const catchAsync = require('./../utils/catchAsync')
const Cart = require('./../models/cartModel')

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({
    user: req.body.user,
  })

  res.status(200).json({
    cart,
  })
})

const getIncludes = (oldCart, newCartItem) => {
  //) Get all the IDs of the products
  const productsId = oldCart.products.map(product => product.product.id)
  const id = newCartItem.product

  //) Check if the current ID is already on the previous IDs
  const contains = productsId.includes(id)

  //) If contains, increment the quantity by 1, if not push the product
  if (contains) {
    //2 Get the index of the added product
    const productIdx = productsId.indexOf(id)

    //2 Increemnt the Quantity by the Given the Quantity
    oldCart.products[productIdx].quantity += newCartItem.quantity

    //2 Return the cart
    return oldCart
  }

  //* Add the product into the old cart
  oldCart.products.push(newCartItem)
  return oldCart
}

exports.editCart = catchAsync(async (req, res, next) => {
  const { product, user } = req.body

  //! ORDERED PRODUCTS ARE RETURNED, FIND A WAY TO FILTER THEM
  let oldCart = await Cart.findOne({ user })

  const newCartItem = {
    product: product.id,
    quantity: product.quantity || 1,
  }

  //* Check if the item is already on the cart, if true add a Quantity, if false add it to the Cart
  oldCart = getIncludes(oldCart, newCartItem)

  let cart

  if (oldCart) cart = await oldCart.save()

  console.log({ cart: cart.products })

  res.status(200).json({
    message: 'Product Added To Cart',
    cart,
  })
})
