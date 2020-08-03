const products = [];
let filter = name;
let error = null;

/**
 * Find a product from the local store by its id
 * @param {Number} id ID of Product Object to find
 */
function findById(id) {
  return this.products.find(product => product.id === id);
}

/**
 * Add a product to the local store
 * @param {Object} product Product Object to add
 */
function addProduct(product) {
  this.products.push(product);
}

/**
 * Update a product's data in the local store
 * @param {Number} id ID of product object to update
 * @param {Object} newData Set of data to update
 */
function updateProduct(id, newData) {
  const product = this.findById(id);
  Object.assign(product, newData);
}

/**
 * Remove a product from the local store
 * @param {Number} id ID of product Object to remove
 */
function deleteProduct(id) {
  this.products = this.products.filter(product => product.id !== id);
}

/**
 * Set the filter
 * @param {Number} num
 */
function setFilter(num) {
  this.filter = num;
}

/**
 * Set the error
 * @param {Object} error
 */
function setError(error) {
  this.error = error;
}

export default {
  products,
  filter,
  error,
  findById,
  addProduct,
  deleteProduct,
  setFilter,
  setError
};