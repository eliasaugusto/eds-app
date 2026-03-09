# Title Description

## Description
`title-description` renders authored rows as title and description pairs.

## Authoring Instructions
1. Add a `title-description` block to a section.
2. Add one row per content item.
3. Use columns in this order: `title | description`.
4. Description is optional.

## Content Structure

| Column | Field | Required | Notes |
| --- | --- | --- | --- |
| 1 | Title | Yes | Heading preferred; plain text is converted to `h2`. |
| 2 | Description | No | Supports rich text. |

## Expected HTML Structure

Authored block (before decoration):

```html
<div class="title-description">
  <div>
    <div><h2>Modern Authoring Experience</h2></div>
    <div><p>Build pages faster with reusable blocks and clear structure.</p></div>
  </div>
</div>
```

Decorated output (simplified):

```html
<div class="title-description block" data-block-name="title-description">
  <ul>
    <li class="title-description-item">
      <article class="title-description-card">
        <div class="title-description-title"><h2>Modern Authoring Experience</h2></div>
        <div class="title-description-description"><p>Build pages faster...</p></div>
      </article>
    </li>
  </ul>
</div>
```

## Behavior
- Converts each authored row into one title-description item.
- Keeps authored heading markup when provided.
- Converts plain title text to `h2`.
- Gracefully handles missing description.

## Responsive Behavior
- Mobile-first single-column layout.
- `min-width: 900px`: increased spacing between items.
