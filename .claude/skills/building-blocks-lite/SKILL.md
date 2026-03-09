---
name: building-blocks-lite
description: Lean guide to create or modify blocks in boilerplate-based EDS projects.
---

# Building Blocks Lite

Objective implementation guidance for blocks with a focus on consistency.

## Prerequisites

Before implementation:
- Test content is defined (CDD Lite)
- Block content structure is defined (from `authoring-contract-lite` when applicable)

## Steps

1. File structure
- Create or edit `blocks/{block-name}/{block-name}.js`
- Create or edit `blocks/{block-name}/{block-name}.css`

For new blocks, also create Sidekick library assets by default:
- `tools/sidekick/blocks/{block-name}.html`
- `tools/sidekick/blocks/{block-name}.html.plain.html`
- Add block entry in `tools/sidekick/library.json`

For variants of an existing block:
- Keep the existing block entry in `tools/sidekick/library.json` (same top-level group name)
- Add variant samples to the existing block item page (`{block-name}.html` and `{block-name}.html.plain.html`) with additional `library-metadata` sections
- Use clear sample names such as `Default`, `Centered`, `Compact`
- Do not create a separate top-level library group for variants unless explicitly requested

2. JavaScript
- Export `default function decorate(block)`
- Transform DOM in a resilient way (optional fields)
- Avoid unnecessary external dependencies

3. CSS
- Scope selectors to the block (`.{block-name} ...`)
- Mobile first
- Breakpoints in `min-width`: `600px`, `900px`, `1200px`

4. Documentation
- Create or update `docs/blocks/{block-name}.md`
- Include authoring structure and expected behavior

Language and content conventions:
- Follow project defaults in `AGENTS.md` for docs, Sidekick metadata, and sample content.

## Block Creation Rules (Required)

When creating a new block, you MUST complete all of the following:

1. Define the content model (authoring structure)
2. Implement block JavaScript and CSS
3. Create block documentation
4. Create Sidekick library item files and register the block in `tools/sidekick/library.json`

When creating or updating a block variant, you MUST complete all of the following:

1. Add or update variant sample(s) in the existing Sidekick block item page
2. Keep a single top-level block group in `tools/sidekick/library.json`
3. Ensure variant names in `library-metadata` are clear and author-friendly

Block documentation path:

`docs/blocks/{block-name}.md`

Block documentation must include:

- Block name
- Description
- Authoring instructions
- Content structure (table format)
- Expected HTML structure
- Behavior description
- Responsive behavior

If documentation is missing, implementation is incomplete.

If Sidekick files are missing for a new block, implementation is incomplete.

5. Validation
- Test with real example content
- Run `npm run lint`

## Completion Checklist

- Block renders locally
- CSS is properly scoped
- No lint errors
- Block documentation is updated
