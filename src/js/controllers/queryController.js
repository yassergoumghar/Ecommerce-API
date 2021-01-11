import { paramsMethod } from './../utils/Variables';

const { filterRoute } = paramsMethod;

const getFilterLink = (originalLink, filter) => {
  //2 Go to:  GET: '/products/results?search_query=searchString&category=men' or '/products/results?category=men'

  console.log(originalLink, filter);

  let link;

  if (originalLink.includes(filterRoute)) {
    console.log('ALready looked for');
  } else {
    console.log('First Time');
  }

  return link;
};

const queryHandler = (e) => {
  //) Prevent Reload
  e.preventDefault();

  //) Get clicked query filter
  const { id, baseURI } = e.path[0];

  //) Get search controller
  getFilterLink(baseURI, id);
};

export const queryListener = (el) => {
  const [string, element] = el;
  if (element) element.addEventListener('click', queryHandler);
};
