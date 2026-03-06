# Product Grid

## Description
`product-grid` renders authored product rows as responsive product cards with optional image, title, description, price or metadata, and a call-to-action link.

## Authoring Instructions
1. Add a `product-grid` block to a section.
2. Add one row per product.
3. Use columns in this order when possible: image, title, description, price (or key metadata), CTA link.
4. Keep the CTA link in the last column.

## Content Structure

| Column | Field | Required | Notes |
| --- | --- | --- | --- |
| 1 | Image | No | First picture in the row is used as product media. |
| 2 | Title | Yes | Plain text is converted to `h3` if no heading is authored. |
| 3 | Description | No | Supporting copy for the product. |
| 4 | Price / Meta | No | Main value, such as price or short details. |
| 5 | CTA | No | Last column containing a link is styled as CTA. |

## Expected HTML Structure

Authored block (before decoration):

```html
<div class="product-grid">
  <div>
    <div><picture>...</picture></div>
    <div>Product title</div>
    <div>Short description</div>
    <div>$129.00</div>
    <div><a href="/products/item">View product</a></div>
  </div>
</div>
```

Decorated output (simplified):

```html
<div class="product-grid block" data-block-name="product-grid">
  <ul>
    <li class="product-grid-item">
      <article class="product-grid-card">
        <div class="product-grid-media"><picture>...</picture></div>
        <div class="product-grid-body">
          <div class="product-grid-title"><h3>Product title</h3></div>
          <div class="product-grid-description">Short description</div>
          <div class="product-grid-price">$129.00</div>
          <div class="product-grid-cta"><a href="/products/item">View product</a></div>
        </div>
      </article>
    </li>
  </ul>
</div>
```

## Behavior
- Converts each authored row into a single product card.
- Optimizes the first detected image per row with `createOptimizedPicture`.
- Assigns semantic classes for title, description, price, meta, and CTA.
- If the title cell has no heading, the text is wrapped in `h3`.

## Responsive Behavior
- Mobile-first single-column grid.
- `min-width: 600px`: 2 columns.
- `min-width: 900px`: 3 columns.
- `min-width: 1200px`: 4 columns.
