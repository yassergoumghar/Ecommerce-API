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
];

export const elements = {
  carts: document.querySelectorAll('.cart'),
  likes: document.querySelectorAll('.like'),
  search: document.querySelectorAll('.search-switch'),
  searchElements: document.querySelectorAll('.search'),
  filter: {},
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
