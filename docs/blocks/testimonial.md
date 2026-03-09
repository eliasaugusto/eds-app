# Testimonial

## Description
`testimonial` renders authored rows into testimonial cards with quote, author, role, and optional avatar.

## Authoring Instructions
1. Add a `testimonial` block to a section.
2. Add one row per testimonial.
3. Use either of these row orders:
   - `avatar | quote | author | role`
   - `quote | author | role`
4. Keep quote text in the quote cell and concise attribution in author/role cells.

## Content Structure

| Column | Field | Required | Notes |
| --- | --- | --- | --- |
| 1 | Avatar OR Quote | Yes* | If it contains a picture, it is treated as avatar. Otherwise it is treated as quote. |
| 2 | Quote OR Author | Yes | With avatar present, this is quote. Without avatar, this is author. |
| 3 | Author OR Role | Yes* | With avatar present, this is author. Without avatar, this is role. |
| 4 | Role | No | Used only when avatar is present in column 1. |

`*` A quote is always required. Author and role are strongly recommended.

## Expected HTML Structure

Authored block (before decoration):

```html
<div class="testimonial">
  <div>
    <div><picture>...</picture></div>
    <div><p>"The platform is fast and easy to maintain."</p></div>
    <div><p>Alex Martin</p></div>
    <div><p>Product Manager</p></div>
  </div>
  <div>
    <div><p>"Authoring got much easier for our team."</p></div>
    <div><p>Priya Silva</p></div>
    <div><p>Content Strategist</p></div>
  </div>
</div>
```

Decorated output (simplified):

```html
<div class="testimonial block" data-block-name="testimonial">
  <ul>
    <li class="testimonial-item">
      <article class="testimonial-card">
        <div class="testimonial-avatar"><picture>...</picture></div>
        <div class="testimonial-content">
          <blockquote class="testimonial-quote">...</blockquote>
          <div class="testimonial-meta">
            <p class="testimonial-author">Alex Martin</p>
            <p class="testimonial-role">Product Manager</p>
          </div>
        </div>
      </article>
    </li>
  </ul>
</div>
```

## Behavior
- Converts each authored row into one testimonial card.
- Supports optional avatar by detecting a `picture` in the first cell.
- Optimizes avatar images using `createOptimizedPicture`.
- Keeps quote and attribution content as authored.

## Responsive Behavior
- Mobile-first single-column cards.
- `min-width: 600px`: two-column grid.
- `min-width: 900px`: avatar/content split layout for each card.
