export const elements = {
  carts: document.querySelectorAll('.cart'),
  likes: document.querySelectorAll('.like'),
  search: document.querySelectorAll('.search-switch'),
  searchElements: document.querySelectorAll('.search'),
  categories: {
    men: document.getElementById('men'),
    women: document.getElementById('women'),
    bags: document.getElementById('bags'),
    clothing: document.getElementById('clothing'),
    shoes: document.getElementById('shoes'),
    accessories: document.getElementById('accessories'),
    kids: document.getElementById('kids'),
  },
  branding: document.getElementById('branding'),
  price: document.getElementById('price'),
  size: document.getElementById('size'),
  colors: document.getElementById('colors'),
  tags: document.getElementById('tags'),
};

export const routes = {
  checkout: '/checkout',
  likes: '/likes',
  search: '/products/results?search_query=',
};
