# YouTube Player

## Description
`youtube-player` renders authored YouTube links or IDs into embedded video players with optional title and description.

## Authoring Instructions
1. Add a `youtube-player` block to a section.
2. Add one row per video.
3. Use columns in this order: `youtube url or id | title | description`.
4. Supported video values include:
   - Full URL (`https://www.youtube.com/watch?v=...`)
   - Short URL (`https://youtu.be/...`)
   - Direct 11-character video ID

## Content Structure

| Column | Field | Required | Notes |
| --- | --- | --- | --- |
| 1 | YouTube URL or ID | Yes | First link in the cell is preferred; plain text is also supported. |
| 2 | Title | No | If no heading is authored, text is wrapped in `h3`. |
| 3 | Description | No | Supporting text shown below the player. |

## Expected HTML Structure

Authored block (before decoration):

```html
<div class="youtube-player">
  <div>
    <div><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Video URL</a></div>
    <div><h3>Platform Walkthrough</h3></div>
    <div><p>Quick tour of the authoring flow.</p></div>
  </div>
</div>
```

Decorated output (simplified):

```html
<div class="youtube-player block" data-block-name="youtube-player">
  <ul>
    <li class="youtube-player-item">
      <article class="youtube-player-card">
        <div class="youtube-player-media">
          <iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" loading="lazy"></iframe>
        </div>
        <div class="youtube-player-content">
          <div class="youtube-player-title"><h3>Platform Walkthrough</h3></div>
          <div class="youtube-player-description"><p>Quick tour of the authoring flow.</p></div>
        </div>
      </article>
    </li>
  </ul>
</div>
```

## Behavior
- Converts each authored row into one embedded YouTube player.
- Supports common YouTube URL formats and direct video IDs.
- Uses `youtube-nocookie.com` embeds by default.
- Skips invalid rows safely.

## Responsive Behavior
- Mobile-first layout with 16:9 media ratio.
- `min-width: 900px`: increases content spacing.
