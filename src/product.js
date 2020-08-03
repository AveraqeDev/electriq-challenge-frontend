import $ from 'jquery';
import store from './store';

/**
 * Generate HTML String for a Product
 * @param {Object} product
 */
function generateProductElement(product) {
  return `
    <div class="product" data-product-id="${product.id}">
      <img src=${product.image.src} alt=${product.title} />
      <span class="product_name">${product.title}</span>
      <span class="product_price">${product.variants[0].price}</span>
    </div>
  `;
}

/**
 * Generates HTML String for a list of Products
 * @param {Array} productsList
 */
function generateProductsString(productsList) {
  const products = productsList.map(product => generateProductElement(product));
  return products.join('');
}

/**
 * Gets the Id of the Product element
 * @param {Object} product
 */
function getIdFromElement(product) {
  return $(product).closest('.product').data('product-id');
}

/**
 * Generates HTML String for error message
 * @param {String} message
 */
function generateError(message) {
  return `
    <section class="error-content">
      <button id="close-button">X</button>
      <p>${message}</p>
    </section>
  `;
}

/**
 * Handles rendering error if exists
 */
function renderError() {
  if(store.error) {
    $('.error-box').removeClass('hidden');
    $('.error-box').html(generateError(store.error.message));
  } else {
    $('.error-box').addClass('hidden');
  }
}

/**
 * Renders products to the browser window
 */
function render() {
  let html = '';

  renderError();

  let products = [...store.products];
  if(store.filter === 'price_ascending') {
    products.sort((a, b) => a.variants[0].price - b.variants[0].price);
  } else if(store.filter === 'price_descending') {
    products.sort((a, b) => b.variants[0].price - a.variants[0].price);
  } else {
    products.sort((a, b) => a.title - b.title);
  }

  html = generateProductsString(products);

  $('.products-container').html(html);
}

/**
 * EVENT LISTENERS
 */

/**
 * Handles when a product is clicked"
 */
function handleProductClicked() {
  $('.product-container').on('click', '.product', event => {
    let product = store.findById(getIdFromElement(event.currentTarget));
    alert(`Clicked on ${product.title}`);
  });
}

/**
 * Handles when a 'Filter' button is clicked
 */
function handleFilterChange() {
  $('.filter-price').click(event => {
    if(store.filter === 'price_ascending') {
      store.filter = 'price_descending';
      $('.filter-price').html('Price ▼');
      $('.filter-name').html('Name');
    } else {
      store.filter = 'price_ascending';
      $('.filter-price').html('Price ▲');
      $('.filter-name').html('Name');
    }
    render();
  });

  $('.filter-name').click(event => {
    event.preventDefault();
    store.filter = 'name';
    $('.filter-name').html('Name ▲');
    $('.filter-price').html('Price');
    render();
  });
}

/**
 * Handles when the 'X' button is clicked on error box
 */
function handleErrorClose() {
  $('.error-box').on('click', '#close-button', event => {
    store.setError(null);
    renderError();
  });
}

/**
 * Runs all Event Listener functions to start Listening
 */
function bindEventListeners() {
  handleProductClicked();
  handleFilterChange();
  handleErrorClose();
}

export default {
  render,
  bindEventListeners
};