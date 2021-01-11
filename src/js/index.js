//) Import elements
import { elements } from './utils/Variables';
import {
  cartController,
  likeController,
  searchController,
} from './controllers/headerController';

import * as ShopController from './controllers/shopController';

//4 Get Variables
const { carts, likes, search } = elements;

//2 Initializer
const init = () => {
  //* HomePage Controller: '/'
  //2 Call Go to cart controller
  cartController(carts);

  //2 Call Go to Like Controller
  likeController(likes);

  //2 Call Search Controller
  searchController(search);

  //* Shop page: '/shop' Controller
  //2 Call search Controller
  ShopController.searchController();

  //2 Call Query controller
  ShopController.queryController();
};

init();
