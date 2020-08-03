import $ from 'jquery';
import Hero from './hero.jpg';

/**
 * Renders hero to the browser window
 */
function render() {
  let html = `
    <img class="hero-image" src=${Hero} alt="The Sill Monstera Variant Medium Grant Cream" />
    <div class="hero-content">
      <h1>Plants For Sale</h1>
      <button>Buy Now</button>
    </div>
  `;

  $('.hero').html(html);
}

export default {
  render
};