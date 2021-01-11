const queryHandler = (e) => {
  //) Prevent Reload
  e.preventDefault();

  //) Get clicked query filter
  const filter = e.path[0].innerHTML;
  console.log(filter);
};

export const queryListener = (el) => {
  const [string, element] = el;
  if (element) element.addEventListener('click', queryHandler);
};
