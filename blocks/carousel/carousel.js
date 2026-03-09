import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Builds one slide item from an authored row.
 * Authoring order: image | title | description | link
 * @param {HTMLDivElement} row
 * @returns {HTMLLIElement|null}
 */
function buildSlide(row) {
  const cells = [...row.children];
  const [imageCell, titleCell, descriptionCell, linkCell] = cells;

  const picture = imageCell?.querySelector('picture');
  const img = picture?.querySelector('img');
  if (!img) return null;

  const item = document.createElement('li');
  item.className = 'carousel-slide';

  const media = document.createElement('div');
  media.className = 'carousel-media';
  picture.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '1200' }, { width: '750' }]));
  media.append(...imageCell.childNodes);
  item.append(media);

  const content = document.createElement('div');
  content.className = 'carousel-content';

  if (titleCell?.textContent.trim()) {
    const title = document.createElement('div');
    title.className = 'carousel-title';
    const authoredHeading = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
    if (authoredHeading) {
      title.append(...titleCell.childNodes);
    } else {
      const h3 = document.createElement('h3');
      h3.textContent = titleCell.textContent.trim();
      title.append(h3);
    }
    content.append(title);
  }

  if (descriptionCell?.textContent.trim()) {
    const description = document.createElement('div');
    description.className = 'carousel-description';
    description.append(...descriptionCell.childNodes);
    content.append(description);
  }

  const link = linkCell?.querySelector('a');
  if (link) {
    const cta = document.createElement('div');
    cta.className = 'carousel-cta';
    cta.append(...linkCell.childNodes);
    content.append(cta);
  }

  if (content.children.length) {
    item.append(content);
  }

  return item;
}

/**
 * Updates slide position with wrapping behavior.
 * @param {HTMLElement} track
 * @param {number} index
 */
function updateSlidePosition(track, index) {
  track.style.transform = `translateX(-${index * 100}%)`;
}

/**
 * loads and decorates the carousel block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const slides = rows.map(buildSlide).filter(Boolean);

  if (!slides.length) {
    block.textContent = '';
    return;
  }

  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';

  const track = document.createElement('ul');
  track.className = 'carousel-track';
  slides.forEach((slide) => track.append(slide));
  viewport.append(track);

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';

  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'carousel-control carousel-control-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.textContent = 'Previous';

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'carousel-control carousel-control-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.textContent = 'Next';

  controls.append(prevButton, nextButton);

  let currentIndex = 0;
  const total = slides.length;

  const goTo = (nextIndex) => {
    currentIndex = (nextIndex + total) % total;
    updateSlidePosition(track, currentIndex);
  };

  prevButton.addEventListener('click', () => goTo(currentIndex - 1));
  nextButton.addEventListener('click', () => goTo(currentIndex + 1));

  if (total <= 1) {
    prevButton.hidden = true;
    nextButton.hidden = true;
  }

  block.replaceChildren(viewport, controls);
  updateSlidePosition(track, currentIndex);
}
