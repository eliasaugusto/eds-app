import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Moves all child nodes from source to target.
 * @param {Element|null} source
 * @param {Element} target
 */
function moveContent(source, target) {
  if (!source) return;
  while (source.firstChild) {
    target.append(source.firstChild);
  }
}

/**
 * Builds one testimonial card from an authored row.
 * Supported orders:
 * - avatar, quote, author, role
 * - quote, author, role
 * @param {HTMLDivElement} row
 * @returns {HTMLLIElement|null}
 */
function buildTestimonial(row) {
  const cells = [...row.children];
  if (!cells.length) return null;
  const [firstCell] = cells;

  let offset = 0;
  let avatarCell = null;

  if (firstCell?.querySelector('picture')) {
    avatarCell = firstCell;
    offset = 1;
  }

  const quoteCell = cells[offset] || null;
  const authorCell = cells[offset + 1] || null;
  const roleCell = cells[offset + 2] || null;

  if (!quoteCell || !quoteCell.textContent.trim()) return null;

  const item = document.createElement('li');
  item.className = 'testimonial-item';

  const card = document.createElement('article');
  card.className = 'testimonial-card';

  if (avatarCell) {
    const picture = avatarCell.querySelector('picture');
    const image = picture?.querySelector('img');
    if (picture && image) {
      const avatar = document.createElement('div');
      avatar.className = 'testimonial-avatar';
      const alt = image.alt || authorCell?.textContent.trim() || 'Avatar';
      picture.replaceWith(createOptimizedPicture(image.src, alt, false, [{ width: '120' }]));
      moveContent(avatarCell, avatar);
      card.append(avatar);
    }
  }

  const content = document.createElement('div');
  content.className = 'testimonial-content';

  const quote = document.createElement('blockquote');
  quote.className = 'testimonial-quote';
  moveContent(quoteCell, quote);
  content.append(quote);

  const meta = document.createElement('div');
  meta.className = 'testimonial-meta';

  if (authorCell && authorCell.textContent.trim()) {
    const author = document.createElement('p');
    author.className = 'testimonial-author';
    moveContent(authorCell, author);
    meta.append(author);
  }

  if (roleCell && roleCell.textContent.trim()) {
    const role = document.createElement('p');
    role.className = 'testimonial-role';
    moveContent(roleCell, role);
    meta.append(role);
  }

  if (meta.children.length) {
    content.append(meta);
  }

  card.append(content);
  item.append(card);
  return item;
}

/**
 * Loads and decorates the testimonial block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const list = document.createElement('ul');

  rows.forEach((row) => {
    const item = buildTestimonial(row);
    if (item) list.append(item);
  });

  block.replaceChildren(list);
}
