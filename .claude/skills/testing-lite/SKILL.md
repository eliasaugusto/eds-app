---
name: testing-lite
description: Lean validation for changes in blocks, scripts, and styles in EDS projects.
---

# Testing Lite

Minimum checklist before completing a task.

## When to Use

Use after any change in:
- `blocks/`
- `scripts/`
- `styles/`

## Required Steps

1. Lint
- Run `npm run lint`
- If needed, run `npm run lint:fix` and review the diff

2. Local functional validation
- Open the test page at `http://localhost:3000`
- Confirm the block or flow works with no console errors

3. Responsive validation
- Test on mobile, tablet, and desktop
- Confirm there is no obvious visual regression

4. Basic accessibility
- Check heading hierarchy
- Check image alt text where applicable
- Check keyboard navigation in primary interactions

## Quality Requirements

### Performance

- Follow AEM Edge Delivery performance best practices: `https://www.aem.live/developer/keeping-it-100`
- Keep non-critical resources lazy (`lazy-styles.css`, `delayed.js`)
- Minimize JavaScript size and dependencies
- Ensure committed static assets are optimized

### Accessibility

- Ensure proper heading hierarchy
- Include alt text for images
- Validate keyboard interaction for key flows
- Follow WCAG 2.1 AA basics

## Expected Output

- Lint passes
- Functionality validated locally
- Responsive behavior verified
- No obvious accessibility regression
