import { paramsMethod } from './../utils/Variables';

const { filterRoute } = paramsMethod;

const getFilterLink = (originalLink, filter, type) => {
  //2 Go to:  GET:
  const params = '?';
  const sameFilter = originalLink.includes(filter);

  let link;

  //2 Check if the filter is already has been used:
  if (!sameFilter) {
    if (originalLink.includes(type)) {
      //) '/products?search_query=searchString&category=men,women'
      const re = /&/;
      const oldFilter = originalLink.split(`${type}=`)[1].split(re)[0];
      // const newFilter = `${oldFilter},${filter}`;

      return originalLink.replace(oldFilter, filter);
    } else {
      const filtered = originalLink.includes(params);

      //) Speacial Case: '/products?'
      const speacialCase = originalLink.split(params)[1] === '';
      if (speacialCase) return `${filterRoute}${params}${type}=${filter}`;

      //) '/products?search_query=searchString&category=men' or '/products?category=men'
      const reqString = filtered ? '&' : '?';
      link = `${originalLink}${reqString}${type}=${filter}`;
    }
  }

  return link;
};

const queryHandler = (e) => {
  //) Prevent Reload
  e.preventDefault();

  //) Get clicked query filter
  const { id, baseURI } = e.path[0];
  const type = e.path[0].offsetParent.id;

  //) Get the filter link
  const link = getFilterLink(baseURI, id, type);

  //) Change the link dinamicly
  if (link) location.href = link;
};

export const queryListener = (el) => {
  const [string, element] = el;
  if (element) element.addEventListener('click', queryHandler);
};
