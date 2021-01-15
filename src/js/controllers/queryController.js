import { paramsMethod } from './../utils/Variables';

const { productRoute } = paramsMethod;

const getIndex = (originalFilter, type) => {
  let idx;

  originalFilter.forEach((filter, i) => {
    const includes = filter.includes(type);
    includes ? (idx = i) : undefined;
  });

  return idx;
};

export const getFilter = (oldLink, filter, checked) => {
  //& Check if there is no older filter => Base Case and it's Checked
  const firstFilter = oldLink[1].length < 2;

  //& Get old filter
  let [, oldFilter] = oldLink;
  const [type] = filter.split('=');

  //& Check Paging and remove it, if only the paginate is not the target
  const pageReg = /(\?|&)?page=[-0-9]+/g;
  const paginate = filter.includes('page');

  if (!paginate) oldFilter = oldFilter.replace(pageReg, '');

  if (firstFilter && checked) return `${productRoute}?${filter}`;

  //) Check if the same filter to replace Or add the new filter to the old filter
  const sameFilter = oldLink.join('?').includes(type);

  if (sameFilter) {
    //= Check if filter is Price
    const priceFilter = filter.includes('price');

    if (priceFilter) {
      //) Replace the Old filter with the new one
      let defaultFilter = oldFilter.replace(
        /(\?|&)?price\[(gte|lte)\]=[-0-9]+&?/g,
        ''
      );
      if (checked) defaultFilter = defaultFilter.concat(`&${filter}`);

      const newFilter = defaultFilter !== '' ? `?${defaultFilter}` : '';

      //) Return the filter
      return `${productRoute}${newFilter}`;
    }

    //) Get All the filters
    const oldFilters = oldFilter.split('&');

    //) Get the Old Filter Index
    const oldFiltersIndex = getIndex(oldFilters, type);

    //) Replace the Old filter
    if (checked) oldFilters[oldFiltersIndex] = filter;
    if (!checked) oldFilters.splice(oldFiltersIndex, 1);

    const newFilter = oldFilters.length > 0 ? `?${oldFilters.join('&')}` : '';

    //) Return the new filter
    return `${productRoute}${newFilter}`;
  }

  const old = oldFilter !== '' ? `?${oldFilter}&` : '?';

  return `${productRoute}${old}${filter}`;
};

const queryHandler = (e) => {
  //) Prevent Reload
  // e.preventDefault();

  //) Get clicked query filter
  const { id, baseURI, checked } = e.path[0];
  const oldFilter = baseURI.split(/\/products\#?\??/g);

  //) Get the filter link
  const link = getFilter(oldFilter, id, checked);

  //) Change the link dinamicly
  if (link) location.href = link;
};

export const queryListener = (el) => {
  if (el) el.addEventListener('click', queryHandler);
};
