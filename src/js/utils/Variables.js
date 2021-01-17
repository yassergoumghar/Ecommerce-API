const els = [
  'categories=men',
  'categories=women',
  'categories=bags',
  'categories=clothing',
  'categories=accessories',
  'categories=kids',
  'categories=shoes',
  'brand=louisVuitton',
  'brand=chanel',
  'brand=hermes',
  'brand=gucci',
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
  filterCheckmarks: document.querySelectorAll('.filter'),
  queries: document.getElementById('queries'),
  addToCart: document.querySelectorAll('.addToCart'),
  productId: document.querySelectorAll('.product__id'),
};

export const preferences = {
  paginationLimit: 12,
};

export const messages = {
  productNotFound: 'Sorry No Product was found !',
};

export const classnames = {
  hide: 'hide',
  preview: 'product__item__pic',
  paginate: 'paginate',
  rendered: 'rendered',
  productQuantiy: 'product__quantity',
};

els.forEach((key) => {
  elements.filter[key] = document.getElementById(key);
});

export const routes = {
  checkout: '/checkout',
  likes: '/likes',
  search: '/products?search_query=',
  previewProduct: '/products/',
  isLoggedIn: '/api/v1/auth/loggedIn',
  addCart: '/api/v1/carts/new',
};

export const paramsMethod = {
  productRoute: '/products',
};
