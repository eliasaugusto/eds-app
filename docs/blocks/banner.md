# Banner

## Description
`banner` renders a hero-like section with background image, title, description, and a CTA.

## Authoring Instructions
1. Add a `banner` block to a section.
2. Author one row using this order: `background image | title | description | cta`.
3. Use a heading element in the title cell when possible.
4. Add a link in the CTA cell. If styled as a button, it is preserved.
5. Optional variation: add the `centered` class to the block to center title, description, and CTA.

## Content Structure

| Column | Field | Required | Notes |
| --- | --- | --- | --- |
| 1 | Background image | No | Uses the first authored `picture` in the cell. |
| 2 | Title | Yes | Heading preferred; plain text is converted to `h2`. |
| 3 | Description | No | Supports rich text. |
| 4 | CTA | No | Uses the first link in the cell. |

## Expected HTML Structure

Authored block (before decoration):

```html
<div class="banner">
  <div>
    <div><picture>...</picture></div>
    <div><h2>Ship Better Experiences Faster</h2></div>
    <div><p>Build and publish content quickly with resilient authored components.</p></div>
    <div><a href="/contact">Talk to an expert</a></div>
  </div>
</div>
```

Decorated output (simplified):

```html
<div class="banner block" data-block-name="banner">
  <div class="banner-inner">
    <div class="banner-background"><picture>...</picture></div>
    <div class="banner-content">
      <div class="banner-title"><h2>...</h2></div>
      <div class="banner-description"><p>...</p></div>
      <div class="banner-cta"><a href="/contact">...</a></div>
    </div>
  </div>
</div>
```

Centered variation (simplified):

```html
<div class="banner centered block" data-block-name="banner">
  <div class="banner-inner">
    <div class="banner-content">...</div>
  </div>
</div>
```

## Behavior
- Uses first row only to build one banner.
- Keeps authored heading/description/CTA markup when present.
- Gracefully handles optional fields (image, description, CTA).
- `centered` variation centers content alignment and CTA placement.

## Responsive Behavior
- Mobile-first layout with overlayed content on image.
- `min-width: 600px`: larger spacing and height.
- `min-width: 900px`: desktop spacing and improved readability.
