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
 * Builds one item from authored row.
 * Authoring order: title | description
 * @param {HTMLDivElement} row
 * @returns {HTMLLIElement|null}
 */
function buildItem(row) {
  const cells = [...row.children];
  if (!cells.length) return null;

  const [titleCell, descriptionCell] = cells;
  if (!titleCell?.textContent.trim()) return null;

  const item = document.createElement('li');
  item.className = 'title-description-item';

  const article = document.createElement('article');
  article.className = 'title-description-card';

  const title = document.createElement('div');
  title.className = 'title-description-title';
  const authoredHeading = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
  if (authoredHeading) {
    moveContent(titleCell, title);
  } else {
    const h2 = document.createElement('h2');
    h2.textContent = titleCell.textContent.trim();
    title.append(h2);
  }
  article.append(title);

  if (descriptionCell?.textContent.trim()) {
    const description = document.createElement('div');
    description.className = 'title-description-description';
    moveContent(descriptionCell, description);
    article.append(description);
  }

  item.append(article);
  return item;
}

/**
 * loads and decorates the title-description block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const list = document.createElement('ul');

  rows.forEach((row) => {
    const item = buildItem(row);
    if (item) list.append(item);
  });

  block.replaceChildren(list);
}
