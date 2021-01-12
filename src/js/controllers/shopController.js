import { elements } from './../utils/Variables';
import { searchHandler } from './headerController';
import { queryListener } from './queryController';

const { searchElements, filter } = elements;

const callSearchandler = (e) => {
  e.preventDefault();

  //2 Get input
  const input = document.getElementById('search__input');

  searchHandler(e, input);
};

const searchListener = (search) => {
  search.addEventListener('click', callSearchandler);
};

export const searchController = () => {
  searchElements.forEach((element) => searchListener(element));
};

export const queryController = () => {
  Object.entries(filter).forEach((el) => queryListener(el));
};
