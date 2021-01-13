const els = [
  'men',
  'women',
  'bags',
  'clothing',
  'accessories',
  'kids',
  'louisVuitton',
  'chanel',
  'hermes',
  'gucci',
  'black',
  'blue',
  'yellow',
  'grey',
  'brown',
  'pink',
  'purple',
  'red',
  'white',
  'bags',
  'shoes',
  'clothing',
  'accessories',
  'price[gte]=0&price[lte]=50',
  'price[gte]=50&price[lte]=100',
  'price[gte]=100&price[lte]=150',
  'price[gte]=150&price[lte]=200',
  'price[gte]=200&price[lte]=250',
  'price[gte]=50',
];

export const elements = {
  carts: document.querySelectorAll('.cart'),
  likes: document.querySelectorAll('.like'),
  search: document.querySelectorAll('.search-switch'),
  searchElements: document.querySelectorAll('.search'),
  paginateElement: document.querySelectorAll('.paginate__number'),
  products: document.querySelectorAll('.products__render'),
  productPagination: document.querySelectorAll('.product__pagination'),
  productsHidden: document.querySelectorAll('.product'),
  results: document.querySelectorAll('.resultsNumber'),
  filter: {},
};

export const preferences = {
  paginationLimit: 12,
};

export const messages = {
  productNotFound: 'Sorry No Product was found !',
};

export const classnames = {
  hide: 'hide',
};

els.forEach((key) => {
  elements.filter[key] = document.getElementById(key);
});

export const routes = {
  checkout: '/checkout',
  likes: '/likes',
  search: '/products?search_query=',
};

export const paramsMethod = {
  filterRoute: '/products',
};
