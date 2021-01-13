import { paramsMethod } from './../utils/Variables';

const { filterRoute } = paramsMethod;

const getOldFilter = (originalLink, type) => {
  const re = /&/;

  return originalLink.split(`${type}=`)[1].split(re)[0];
};

export const getFilterLink = (originalLink, filter, type) => {
  //2 Initialize Paginate
  const paginate = 'page';
  const paginateTarget = type === paginate;
  const priceTarget = type.includes('price');

  //2 Input: /product => /product?price[lte]=100

  let priceFilter;

  if (priceTarget) priceFilter = filter;

  //1 input: /product => output: product?type=filter
  const baseCase = originalLink === filterRoute;

  //1 Or a speacial case: input: /product? => output: product?type=filter
  const speacialCase = originalLink === `${filterRoute}?`;

  //2 Check pricing
  const isPricingQuery = priceFilter ? priceFilter : `${type}=${filter}`;

  if (baseCase || speacialCase) {
    const baseCaseLink = `${filterRoute}?${isPricingQuery}`;

    return baseCaseLink;
  }

  //2 Check if the link includes 'page', if true, remove it:
  originalLink = originalLink.replace(/(\?|&)page=[-0-9]+/g, '');
  const queryString = originalLink.includes('?') ? '&' : '?';

  //6 Check if not Paginate to treat if differently
  const isPaginate = originalLink.includes(paginate);

  if (!isPaginate) {
    const sameFilter = originalLink.includes(type);
    if (sameFilter) {
      //3 Check if we're dealing with pricing
      if (priceFilter) {
        const [start, end] = priceFilter.split('&');

        if (start && end) {
          const gte = /price\[gte\]=[-0-9]+\&/g;
          originalLink = originalLink.replace(gte, start);

          const lte = /price\[lte\]=[-0-9]+/g;
          originalLink = originalLink.replace(lte, end);
          return originalLink;
        }

        console.log({ originalLink, type, filter, priceFilter });
      }

      //4 input: /product?type_1=filter_1 ( not pages ) => output: /product?type_1=filter_2
      const oldFilter = getOldFilter(originalLink, type);
      return originalLink.replace(oldFilter, filter);
    } else {
      //2 input: /product?type_1=filter_1 ( not pages ) => output: /product?type_1=filter_1&type=filter
      return `${originalLink}${queryString}${isPricingQuery}`;
    }
  }

  //) Is paginate: Check if the target filter is paginate: if true, move to next page, if the target is
  //) categories, color, brand... remove the paginate filter
  if (paginateTarget) {
    //4 input: /product?page=n  => output: /product?page=filter
    const oldFilter = getOldFilter(originalLink, type);

    return originalLink.replace(oldFilter, filter);
  } else {
    //4 input: /product?categories=men&brand=gucci&page=3 => output: /product?categories=men&brand=filter
    //4 Remove &page=3, edit new filter
    //* /products?brand=louisVuitton&
    //* /products?&brand=louisVuitton

    const sameFilter = originalLink.includes(type);
    if (sameFilter) {
      const oldFilter = getOldFilter(originalLink, type);

      return originalLink.replace(oldFilter, filter);
    }

    return `${originalLink}${queryString}${type}=${filter}`;
  }
};

const queryHandler = (e) => {
  //) Prevent Reload
  e.preventDefault();

  //) Get clicked query filter
  const { id, baseURI } = e.path[0];
  const type = e.path[0].offsetParent.id;

  //) http://localhost:3000/products => products
  const originalLink = `/${baseURI.split('/')[3]}`;

  //) Get the filter link
  const link = getFilterLink(originalLink, id, type);

  console.log(link);

  //) Change the link dinamicly
  // if (link) location.href = link;
};

export const queryListener = (el) => {
  const [string, element] = el;
  if (element) element.addEventListener('click', queryHandler);
};
