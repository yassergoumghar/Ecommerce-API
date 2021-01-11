import { routes } from './../utils/Variables';

//5 Get Variables
const { checkout, likes, search } = routes;

//1 Cart Controller
export const cartController = (carts) => {
  //2 Check if cart exists
  if (carts)
    carts.forEach((cart) => cart.addEventListener('click', goToCheckout));
};

//) Go to Cart handler
const goToCheckout = (e) => {
  //2 Don't reload
  e.preventDefault();

  //2 Redirect to Checkout Route
  location.href = checkout;
};

//1 Like Controller
export const likeController = (likes) => {
  //2 Check if Like exists
  if (likes) likes.forEach((like) => like.addEventListener('click', goToLikes));
};

//) Go to Likes handler
const goToLikes = (e) => {
  //2 Don't reload
  e.preventDefault();

  //2 Redirect to Checkout Route
  location.href = likes;
};

//1 Search Controller
export const searchController = (searches) => {
  //2 Check if search exists
  if (searches) searches.forEach(searchListener);
};

//) Go to Search handler
export const searchHandler = (e, input) => {
  //2 Don't reload
  e.preventDefault();

  //2 Get search string
  const { value } = input;

  //2 Go to:  GET: '/products/results?search_query=value
  if (value) location.href = `${search}${value}`;
};

//) Search Listener
const searchListener = () => {
  //* Get input
  const input = document.getElementById('search-input');

  //* Add event listener to input
  if (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') searchHandler(e, input);
    });
  }
};
