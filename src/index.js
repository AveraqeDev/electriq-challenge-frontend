import $ from 'jquery';
import './index.css';

import api from './api';
import store from './store';
import hero from './hero';
import product from './product';

function main() {

  hero.render();

  api.getProducts()
    .then(products => {
      products.products.forEach(product => store.addProduct(product));
      product.render();
    })
    .catch(error => {
      store.setError(error);
      product.render();
    });

  product.bindEventListeners();
}

$(main);