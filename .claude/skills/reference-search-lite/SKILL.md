---
name: reference-search-lite
description: Quick reference search for EDS with low context cost.
---

# Reference Search Lite

Use this skill to find the right pattern before implementation.

## When to Use

Use when:
- There is uncertainty about an EDS implementation pattern
- You want examples of a similar block
- The local codebase does not answer the question

## Do Not Use

Do not use when:
- The answer is already clear in local code
- The task is a simple isolated CSS adjustment

## Workflow

1. Search in the project first
- Check `blocks/`, `scripts/`, `styles/`, and `docs/blocks/`

2. Check official documentation
- Search `https://www.aem.live/` for architecture guidance and best practices

3. Check implementation references
- Prioritize Block Collection
- Use Block Party for more specific cases

4. Consolidate the decision
- Record 1 clear technical decision to apply in the project
- Avoid copying code verbatim; adapt to local context

## Trusted Sources

- AEM Edge Delivery docs: `https://www.aem.live/docs/`
- Developer tutorial: `https://www.aem.live/developer/tutorial`
- Anatomy of a project: `https://www.aem.live/developer/anatomy-of-a-project`
- David's Model: `https://www.aem.live/docs/davidsmodel`

## Search Shortcuts

- Prefer web search scoped to AEM docs: `site:www.aem.live`
- Search doc index content directly:
`curl -s https://www.aem.live/docpages-index.json | jq -r '.data[] | select(.content | test("KEYWORD"; "i")) | "\(.path): \(.title)"'`

## Expected Output

- 2 to 3 relevant references
- Short summary of the recommended pattern
- Implementation decision applicable to the project
