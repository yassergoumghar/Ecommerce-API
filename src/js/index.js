//) Import elements
import { elements } from './utils/Variables';
import {
  cartController,
  likeController,
  searchController,
} from './controllers/headerController';

import * as ShopController from './controllers/shopController';
import * as ProductController from './controllers/productController';

//6 Clear the Console
console.clear();

//4 Get Variables
const { carts, likes, search } = elements;

//2 Initializer
const init = () => {
  //* HomePage Controller: '/'
  //2 Call Go to cart controller
  if (carts) cartController(carts);

  //2 Call Go to Like Controller
  if (likes) likeController(likes);

  //2 Call Search Controller
  if (search) searchController(search);

  //* Shop page: '/shop' Controller
  //2 Call search Controller
  ShopController.searchController();

  //2 Call Paginate Controller
  ShopController.paginateController();

  //2 Call Query controller
  ShopController.queryController();

  //* Product page: '/product/:slug'. Cart Preview page: '/shop/cart'
  //2 Call Cart Controller
  ProductController.cartController();
};

init();
