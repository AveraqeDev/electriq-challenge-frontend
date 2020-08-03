import config from './config';

/**
 * A Wrapper function for 'fetch' to easily handle errors
 * 
 * @param {String} URL
 * @param {Object} options
 * @returns {Promise}
 */
function apiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      // if responce is not a success, build error object
      if(!res.ok) {
        error = {
          code: res.status
        };
      }

      // if response is ok, return JSON
      return res.json();
    })
    .then(data => {
      // if error exists, place message into error object and
      // reject the Promise with error object
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      // if error is null, return the JSON
      return data;
    });
}

/**
 * Get the list of products from the server
 */
function getProducts() {
  return apiFetch(`${config.API_ENDPOINT}/products`);
}

export default {
  getProducts
};