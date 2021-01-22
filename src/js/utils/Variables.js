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
  filter: {},
  carts: document.querySelectorAll('.cart'),
  likes: document.querySelectorAll('.like'),
  search: document.querySelectorAll('.search-switch'),
  searchElements: document.querySelectorAll('.search'),
  paginateElement: document.querySelectorAll('.paginate__number'),
  products: document.querySelectorAll('.products__render'),
  productPagination: document.querySelectorAll('.product__pagination'),
  productsHidden: document.querySelectorAll('.product'),
  results: document.querySelectorAll('.resultsNumber'),
  filterCheckmarks: document.querySelectorAll('.filter'),
  queries: document.getElementById('queries'),
  addToCart: document.querySelectorAll('.addToCart'),
  productId: document.querySelectorAll('.product__id'),
  alert: document.querySelectorAll('.alert'),
  checkoutButtons: document.querySelectorAll('.checkout'),
};

export const preferences = {
  paginationLimit: 12,
};

export const messages = {
  productNotFound: 'Sorry No Product was found !',
  productAddedToCart: 'PRODUCT ADDED TO CART SUCCESSFULLY',
  orderAddedSuccessfully: 'Order Placed succesfully, Thanks for your purchase',
};

export const classnames = {
  hide: 'hide',
  preview: 'product__item__pic',
  paginate: 'paginate',
  rendered: 'rendered',
  productQuantiy: 'product__quantity',
  success: 'success',
  quantityButton: 'qtybtn',
  spinner: '__loading__spinner',
  checkoutAlert: '__alert',
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
  addCart: '/api/v1/carts/product',
  login: '/login',
  getCartLink: '/api/v1/carts/cart',
  addOrderLink: '/api/v1/orders/new',
};

export const paramsMethod = {
  productRoute: '/products',
};
