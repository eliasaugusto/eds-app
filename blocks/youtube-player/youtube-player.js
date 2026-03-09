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
 * Extracts the YouTube video ID from common URL formats or direct IDs.
 * @param {string} value
 * @returns {string|null}
 */
function extractYoutubeId(value) {
  if (!value) return null;
  const input = value.trim();

  // Accept direct 11-char IDs.
  if (/^[\w-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (url.hostname.includes('youtube.com')) {
      const fromQuery = url.searchParams.get('v');
      if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) return fromQuery;

      const pathParts = url.pathname.split('/').filter(Boolean);
      const markerIndex = pathParts.findIndex((part) => ['embed', 'shorts', 'live'].includes(part));
      if (markerIndex >= 0) {
        const fromPath = pathParts[markerIndex + 1];
        return fromPath && /^[\w-]{11}$/.test(fromPath) ? fromPath : null;
      }
    }
  } catch (e) {
    // Ignore URL parsing errors and return null below.
  }

  return null;
}

/**
 * Builds one video item from an authored row.
 * Authoring order: youtube url/id | title | description
 * @param {HTMLDivElement} row
 * @returns {HTMLLIElement|null}
 */
function buildVideoItem(row) {
  const cells = [...row.children];
  if (!cells.length) return null;

  const [videoCell, titleCell, descriptionCell] = cells;
  const urlOrId = videoCell?.querySelector('a')?.href || videoCell?.textContent || '';
  const videoId = extractYoutubeId(urlOrId);
  if (!videoId) return null;

  const item = document.createElement('li');
  item.className = 'youtube-player-item';

  const article = document.createElement('article');
  article.className = 'youtube-player-card';

  const media = document.createElement('div');
  media.className = 'youtube-player-media';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
  iframe.title = titleCell?.textContent.trim() || 'YouTube video';
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  media.append(iframe);
  article.append(media);

  const hasTitle = !!titleCell?.textContent.trim();
  const hasDescription = !!descriptionCell?.textContent.trim();

  if (hasTitle || hasDescription) {
    const content = document.createElement('div');
    content.className = 'youtube-player-content';

    if (hasTitle) {
      const title = document.createElement('div');
      title.className = 'youtube-player-title';
      const authoredHeading = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (authoredHeading) {
        moveContent(titleCell, title);
      } else {
        const h3 = document.createElement('h3');
        h3.textContent = titleCell.textContent.trim();
        title.append(h3);
      }
      content.append(title);
    }

    if (hasDescription) {
      const description = document.createElement('div');
      description.className = 'youtube-player-description';
      moveContent(descriptionCell, description);
      content.append(description);
    }

    article.append(content);
  }

  item.append(article);
  return item;
}

/**
 * Loads and decorates the youtube-player block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const list = document.createElement('ul');

  rows.forEach((row) => {
    const item = buildVideoItem(row);
    if (item) list.append(item);
  });

  block.replaceChildren(list);
}
