# Carousel

## Description
`carousel` renders authored rows as slides with image, title, description, and link, including previous/next navigation with loop behavior.

## Authoring Instructions
1. Add a `carousel` block to a section.
2. Add one row per slide.
3. Use columns in this order: `image | title | description | link`.
4. The image is required. Title, description, and link are optional but recommended.

## Content Structure

| Column | Field | Required | Notes |
| --- | --- | --- | --- |
| 1 | Image | Yes | First `picture` in the row is used as slide media. |
| 2 | Title | No | Plain text is converted to `h3` if no heading is authored. |
| 3 | Description | No | Supporting text for the slide. |
| 4 | Link | No | First link is rendered as slide CTA. |

## Expected HTML Structure

Authored block (before decoration):

```html
<div class="carousel">
  <div>
    <div><picture>...</picture></div>
    <div><h3>Slide title</h3></div>
    <div><p>Slide description</p></div>
    <div><a href="/more">View more</a></div>
  </div>
</div>
```

Decorated output (simplified):

```html
<div class="carousel block" data-block-name="carousel">
  <div class="carousel-viewport">
    <ul class="carousel-track">
      <li class="carousel-slide">...</li>
    </ul>
  </div>
  <div class="carousel-controls">
    <button class="carousel-control-prev">Previous</button>
    <button class="carousel-control-next">Next</button>
  </div>
</div>
```

## Behavior
- Converts each authored row into one slide.
- Uses lazy-loaded optimized images via `createOptimizedPicture`.
- Includes previous/next controls.
- Wraps navigation: next from the last slide goes to the first slide; previous from the first goes to the last.

## Responsive Behavior
- Mobile-first single-slide viewport.
- Controls stay centered below the carousel.
- `min-width: 900px`: larger spacing and constrained content width.
