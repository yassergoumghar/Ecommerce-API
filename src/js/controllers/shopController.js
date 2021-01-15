import {
  elements,
  preferences,
  messages,
  classnames,
} from './../utils/Variables';
import { searchHandler } from './headerController';
import { queryListener, getFilter } from './queryController';
import * as PaginationView from './../view/paginationView';

const {
  searchElements,
  paginateElement,
  products,
  productPagination,
  productsHidden,
  results,
  filterCheckmarks,
  queries,
} = elements;
const { paginationLimit } = preferences;
const { noProduct, renderAvailablePages } = PaginationView;
const { productNotFound } = messages;
const { hide } = classnames;

const callSearchandler = (e) => {
  e.preventDefault();

  //2 Get input
  const input = document.getElementById('search__input');

  searchHandler(e, input);
};

const searchListener = (search) => {
  if (search) search.addEventListener('click', callSearchandler);
};

const paginateHandler = (e) => {
  e.preventDefault();

  //* Get the wanted paginate
  const { id, baseURI } = e.path[0];
  const oldFilter = baseURI.split(/\/products\#?\??/g);
  const checked = true;

  //* Get link
  const link = getFilter(oldFilter, id, checked);

  //* Go to Link
  if (link) location.href = link;
};

const paginateListener = (paginate) => {
  if (paginate) paginate.addEventListener('click', paginateHandler);
};

const renderResultsNumber = (start, end, total, result) => {
  //* Get the result element

  //* Check if end is less than total, if false put: end = total
  end = end > total ? total : end;

  //* Render The element
  result.innerText = `Showing ${start}– ${end} of ${total} results`;
};

const renderProducts = (page, limit, total) => {
  //* Get the current page, limit, total
  //* Show the intervale: ] limit, (limit * 2) or total **IF TOTAL IS LESS THAN LIMIT * 2  ]

  const start = (page - 1) * limit + 1;
  const end = limit * page;

  //) Check if there are enough products to show:

  if (start > total) return noProduct(products[0], productNotFound);

  //5 Write: Showing 1– 12 of 186 results
  renderResultsNumber(start, end, total, results[0]);

  //5 Render Only needed Products
  for (let n = start - 1; n < end; n++) {
    const product = productsHidden[n];
    if (product) product.classList.remove(hide);
  }
};

const paginateNumber = (paginateElement, limit) => {
  //* Get Total Number
  const number = paginateElement[0].innerText;
  //* (5) ["Length:", "7", "And", "Page:", "2"] => Output: length = 7, page = 2, the ',' is to skip variable: Array Destructuring
  let [, length, , , page] = number.split(' ');

  //* Check if page is specified, if not return 1
  page = page !== '' ? parseInt(page) : 1;

  //) Check if There is no length: If true: Render No Product Found.
  const found = length > 0;
  if (!found) return noProduct(products[0], productNotFound);

  //4 Render Products according to the page request: '/products?page=2' render from 12 to last 14
  renderProducts(page, limit, length);

  //) Check if There is no page specified (1 by default) And Length < Limit: If true: Don't render Pagination
  if (!page && length <= limit) return;

  //) Check if the available pages are less than 5, if true: render less than 5 pages availabe
  const availablePages = Math.ceil(length / limit);
  return renderAvailablePages(productPagination[0], availablePages, page);
};

const renderCheckmark = (queries, filterCheckmarks) => {
  const totalQuery = queries.innerText;

  filterCheckmarks.forEach((filter) => {
    const { id } = filter;
    const check = totalQuery.includes(id);
    filter.checked = check;
  });
};

export const searchController = () => {
  searchElements.forEach((element) => searchListener(element));
};

export const queryController = () => {
  //* Render checked status
  renderCheckmark(queries, filterCheckmarks);

  //* Listen To Queries Clicked
  filterCheckmarks.forEach((checkmark) => queryListener(checkmark));
};

export const paginateController = () => {
  //* Render Paginate Numbers and pass the Paginate element and pagination Limit
  if (paginateElement[0]) paginateNumber(paginateElement, paginationLimit);

  //* Listen for Paginate Click
  const paginates = document.querySelectorAll('.paginate');
  paginates.forEach((paginate) => paginateListener(paginate));
};
