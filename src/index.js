import $ from 'jquery';
import './index.css';

import api from './api';
import store from './store';
import product from './product';

function main() {
  api.getProducts()
    .then(products => {
      products.forEach(product => store.addProduct(product));
      product.render();
    })
    .catch(error => {
      store.setError(error);
      product.render();
    });

  product.bindEventListeners();
}

$(main);