import { elements } from './../utils/Variables';
import { addProductToCart, getCartElements } from './../models/Carts';
import { errorHandler } from './errorController';

const { addToCart } = elements;

const cartHandler = async (e) => {
  try {
    //2 Prevent Reload
    e.preventDefault();

    //2 Add to cart: 'Product, Quantity, User'
    const elements = await getCartElements(e);

    //2 Check if Logged in, if true add a new cart
    if (elements.loggedIn) {
      const cart = await addProductToCart(elements);
    }
  } catch (error) {
    errorHandler(error);
  }
};

//) Cart Controller
export const cartController = () => {
  //7 Get Cart button and listen to click
  if (addToCart.length > 0) addToCart[0].addEventListener('click', cartHandler);
};
