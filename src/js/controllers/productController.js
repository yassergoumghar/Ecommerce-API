import { elements, classnames, messages, routes } from './../utils/Variables'
import { addProductToCart, getCartElements, getCartId } from './../models/Carts'
import { errorHandler } from './errorController'
import { loading, renderSuccess, redirectTo } from './../view/viewBase'
import { addOrder } from './orderController'

const { addToCart, loadingSpinner, alert, checkoutButtons } = elements
const { success, spinner, checkoutAlert } = classnames
const { productAddedToCart, orderAddedSuccessfully } = messages
const { login, orderStatus } = routes

const cartHandler = async e => {
  try {
    //2 Prevent Reload
    e.preventDefault()

    //2 Add to cart: 'Product, Quantity, User'
    const elements = await getCartElements(e)
    const { loggedIn } = elements

    //2 Check if Logged in, if true add a new cart
    if (loggedIn) {
      const spiner = loadingSpinner[0]
      const cartButton = addToCart[0]
      //4 Render loading button
      loading(cartButton, spiner)

      //4 Send to Server
      await addProductToCart(elements)

      //4 Remove the loading
      const reload = true
      const showButton = true
      const alertObject = {
        type: success,
        message: productAddedToCart,
        box: alert[0],
      }
      return renderSuccess(spiner, cartButton, alertObject, reload, showButton)
    }

    //2 If Not logged in:
    //1. Add current Link to the cookie.
    const currentLink = window.location.href
    localStorage.setItem('redirect', currentLink)

    //1  2.Redirect to Login
    window.location.href = login
  } catch (error) {
    errorHandler(error)
  }
}

const checkRedirect = () => {
  //6 Get Local Storage items, if there is a redirect link, then remove it and redirect.
  const link = localStorage.getItem('redirect')

  if (link) {
    //2 Remove the link
    localStorage.removeItem('redirect')

    //2 Redirect to link
    window.location.href = link
  }
}

const getSpinerElement = checkout =>
  document.querySelector(`.${checkout}${spinner}`)

const getAlertElement = checkout =>
  document.querySelector(`.${checkout}${checkoutAlert}`)

const checkoutHandler = async e => {
  //5 Prevent Default
  e.preventDefault()

  //5 Render Loading
  //2 Remove the checkout class
  const checkoutButton = e.target.parentElement
  const checkoutClass = checkoutButton.classList[0]
  const spiner = getSpinerElement(checkoutClass)
  loading(checkoutButton, spiner)

  try {
    //5 Get Cart
    const cart = await getCartId()

    //5 Send order
    const order = await addOrder(cart)

    //5 If the order is added, redirect to success. Else: Render an alert saying something went wrong, Please try again
    if (order) {
      const { data } = order
      const orderId = data.orders[data.orders.length - 1]._id
      const redirectLink = `${orderStatus}/${orderId}`
      const alertElement = getAlertElement(checkoutClass)
      const reload = false
      const showButton = false
      const alertObject = {
        type: success,
        message: orderAddedSuccessfully,
        box: alertElement,
      }
      renderSuccess(spiner, checkoutButton, alertObject, reload, showButton)
      return redirectTo(redirectLink)
    }
  } catch (error) {
    console.error(error)
  }
}

//) Cart Controller
export const cartController = () => {
  //7 Get Cart button and listen to click
  if (addToCart.length > 0) addToCart[0].addEventListener('click', cartHandler)

  //7 Get Checkout Button and listen to CLick, And reload the page, to get the latest Cart
  if (checkoutButtons.length > 0)
    checkoutButtons.forEach(checkout =>
      checkout.addEventListener('click', checkoutHandler)
    )

  //7 Check if there is a Redirect Link, if true redirect
  checkRedirect()
}
