//* Render There was no product found
export const noProduct = (element, message) => {
  const markup = `
    
    <h1> ${message} <h1>
    
    `;

  element.insertAdjacentHTML('afterbegin', markup);
};

//* Render available Pages buttons
export const renderAvailablePages = (element, number, active) => {
  //2 Initialize how many times I should render the paginate element
  let times = [];
  times.length = number;

  let str = '';

  for (let i = 1; i <= number; i++) {
    str = str.replace(
      str,
      `${str} <a href="#" class="paginate ${
        i == active ? 'active' : ''
      }">${i}</a>`
    );
  }

  let markup = `
  <div class="row">
      <div class="col-lg-12">
          <div class="product__pagination">
                TEMPLATE
          </div>
      </div>
  </div>
  `;

  markup = markup.replace('TEMPLATE', str);

  element.insertAdjacentHTML('afterbegin', markup);
};
