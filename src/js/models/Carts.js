import axios from 'axios';
import { errorHandler } from './../controllers/errorController';
import { routes } from './../utils/Variables';
import { elements, classnames } from './../utils/Variables';

const { isLoggedIn, addCart } = routes;
const { productId } = elements;
const { productQuantiy } = classnames;

const getLoggedIn = async () => {
  const res = await axios.get(isLoggedIn);
  const { loggedIn } = res.data;
  return loggedIn;
};

const getProductForCart = () => {
  let product;

  if (productId.length > 0) product = productId[0].innerHTML;

  return product;
};

export const getCartElements = async (e) => {
  //* Check if Logged in.
  const loggedIn = await getLoggedIn();

  //* Get Product ID,
  const product = getProductForCart();

  //* Get Quantity
  const quantity = document.querySelector(`.${productQuantiy}`)
    ? parseInt(document.querySelector(`.${productQuantiy}`).value)
    : undefined;

  return {
    loggedIn,
    product,
    quantity,
  };
};

export const addProductToCart = async (elements) => {
  const { product, quantity } = elements;
  const data = {
    product: {
      id: product,
      quantity: quantity > 0 ? quantity : 1,
    },
  };

  const res = await axios.patch(addCart, data);
  console.log(res);
};
