import { elements, classnames, messages } from './../utils/Variables';
import { addProductToCart, getCartElements } from './../models/Carts';
import { errorHandler } from './errorController';
import { loading, renderSuccess } from './../view/viewBase';

const { addToCart, loadingSpinner, alert } = elements;
const { success } = classnames;
const { productAddedToCart } = messages;

const cartHandler = async (e) => {
  try {
    //2 Prevent Reload
    e.preventDefault();

    //2 Add to cart: 'Product, Quantity, User'
    const elements = await getCartElements(e);

    //2 Check if Logged in, if true add a new cart
    if (elements.loggedIn) {
      //4 Render loading button
      loading(addToCart[0], loadingSpinner[0]);

      //4 Send to Server
      const cart = await addProductToCart(elements);

      //4 Remove the loading
      const alertObject = {
        type: success,
        message: productAddedToCart,
        box: alert[0],
      };
      renderSuccess(loadingSpinner[0], addToCart[0], alertObject);
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
