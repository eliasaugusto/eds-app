import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Converts a product row into a card item.
 * Expected authored order: image, title, description, price/meta, CTA.
 * @param {HTMLDivElement} row
 * @returns {HTMLLIElement}
 */
function buildProductCard(row) {
  const item = document.createElement('li');
  item.className = 'product-grid-item';

  const card = document.createElement('article');
  card.className = 'product-grid-card';

  const body = document.createElement('div');
  body.className = 'product-grid-body';

  const cells = [...row.children];
  let textCellIndex = 0;

  cells.forEach((cell, index) => {
    const picture = cell.querySelector('picture');

    if (picture && !card.querySelector('.product-grid-media')) {
      cell.className = 'product-grid-media';
      const img = picture.querySelector('img');
      if (img) {
        picture.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]));
      }
      card.append(cell);
      return;
    }

    if (index === cells.length - 1 && cell.querySelector('a')) {
      cell.className = 'product-grid-cta';
      body.append(cell);
      return;
    }

    if (textCellIndex === 0) {
      cell.classList.add('product-grid-title');
      if (!cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        const heading = document.createElement('h3');
        heading.textContent = cell.textContent.trim();
        cell.replaceChildren(heading);
      }
    } else if (textCellIndex === 1) {
      cell.classList.add('product-grid-description');
    } else if (textCellIndex === 2) {
      cell.classList.add('product-grid-price');
    } else {
      cell.classList.add('product-grid-meta');
    }

    textCellIndex += 1;
    body.append(cell);
  });

  card.append(body);
  item.append(card);
  return item;
}

/**
 * loads and decorates the product-grid block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const list = document.createElement('ul');

  rows.forEach((row) => {
    if (row.children.length > 0) {
      list.append(buildProductCard(row));
    }
  });

  block.replaceChildren(list);
}
