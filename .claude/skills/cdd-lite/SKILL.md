---
name: cdd-lite
description: Lean content-first process for development in AEM Edge Delivery Services.
---

# CDD Lite

Short workflow to prevent starting implementation without test content.

## When to Use

Use this skill to:
- Create new blocks
- Change the structure of existing blocks
- Update scripts that affect content decoration

## Do Not Use

Do not use for:
- Small visual CSS tweaks without structural impact
- Tasks without code changes

## Workflow

1. Identify test content
- Reuse existing CMS content, or create HTML in `drafts/`.
- If no authored content exists, create static HTML files in `drafts/` and run the dev server with `--html-folder drafts`.
- Follow AEM markup structure and save files with `.html` or `.plain.html`.

2. Define a minimal content model
- Describe the structure authors will fill in.
- Keep complexity low and prefer semantic structure.

3. Implement
- Apply changes in blocks/scripts following project patterns.
- For a new block or authored-structure change, run `authoring-contract-lite` before implementation.
- Implement block files and Sidekick assets using `building-blocks-lite`.

4. Validate
- Verify in `http://localhost:3000` with the selected content.
- Run `npm run lint` and fix issues.

## Expected Output

- Test content defined and accessible
- Clear content structure
- Implementation completed
- Lint passes with no errors

## Quick Rules

- Do not start with code when the content structure is still unclear.
- If you create a new block, update `docs/blocks/{block-name}.md`.

## Useful References and Inspection Commands

- Markup sections and blocks: `https://www.aem.live/developer/markup-sections-blocks`
- Markup reference: `https://www.aem.live/developer/markup-reference`
- Inspect delivered page HTML: `curl http://localhost:3000/path/to/page` (PowerShell: `Invoke-WebRequest http://localhost:3000/path/to/page | Select-Object -ExpandProperty Content`)
- Inspect markdown view: `curl http://localhost:3000/path/to/page.md` (PowerShell: `Invoke-WebRequest http://localhost:3000/path/to/page.md | Select-Object -ExpandProperty Content`)
- Inspect plain HTML view: `curl http://localhost:3000/path/to/page.plain.html` (PowerShell: `Invoke-WebRequest http://localhost:3000/path/to/page.plain.html | Select-Object -ExpandProperty Content`)
