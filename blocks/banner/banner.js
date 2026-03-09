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
 * Loads and decorates the banner block.
 * Authoring order: background image | title | description | cta
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const [row] = [...block.children];
  if (!row) {
    block.textContent = '';
    return;
  }

  const cells = [...row.children];
  const [backgroundCell, titleCell, descriptionCell, ctaCell] = cells;

  const wrapper = document.createElement('div');
  wrapper.className = 'banner-inner';

  const background = document.createElement('div');
  background.className = 'banner-background';
  const picture = backgroundCell?.querySelector('picture');
  if (picture) {
    moveContent(backgroundCell, background);
    wrapper.append(background);
  }

  const content = document.createElement('div');
  content.className = 'banner-content';

  const title = document.createElement('div');
  title.className = 'banner-title';
  const authoredHeading = titleCell?.querySelector('h1, h2, h3, h4, h5, h6');
  if (authoredHeading) {
    moveContent(titleCell, title);
  } else if (titleCell?.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.textContent = titleCell.textContent.trim();
    title.append(h2);
  }

  if (title.children.length) {
    content.append(title);
  }

  if (descriptionCell?.textContent.trim()) {
    const description = document.createElement('div');
    description.className = 'banner-description';
    moveContent(descriptionCell, description);
    content.append(description);
  }

  const ctaLink = ctaCell?.querySelector('a');
  if (ctaLink) {
    const cta = document.createElement('div');
    cta.className = 'banner-cta';
    moveContent(ctaCell, cta);
    content.append(cta);
  }

  if (content.children.length) {
    wrapper.append(content);
  }

  block.replaceChildren(wrapper);
}
