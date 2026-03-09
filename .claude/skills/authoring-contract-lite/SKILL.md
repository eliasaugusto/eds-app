---
name: authoring-contract-lite
description: Define the authoring contract for a new or changed EDS block before implementation.
---

# Authoring Contract Lite

Define how authors will create and maintain content for a block before writing code.

## When to Use
Use this skill to:
- Create a new block
- Change the authored structure of an existing block
- Add block variants
- Decide whether a feature should be a block at all

## Do Not Use
Do not use for:
- Pure CSS-only visual tweaks
- Internal refactors with no authored content impact
- Small JS fixes that do not change the content contract

## Workflow

1. Identify the author goal
- What is the author trying to publish?
- What business/content problem does this solve?

2. Decide the authoring model
Choose one:
- Default content
- Explicit block
- Auto-block
- Spreadsheet/JSON data source

3. Define the block contract
Describe:
- block name
- supported variants
- required rows/columns
- optional rows/columns
- accepted content types per cell
- references allowed (links, images, docs, sheets)

4. Define resilience rules
- What happens if an optional field is missing?
- What happens if authors add extra text or formatting?
- What should be ignored safely?

5. Write a copy-paste authoring example
Provide:
- example table
- example variant
- minimum valid version
- recommended version

6. Validate authoring simplicity
Check:
- Can a non-dev author understand this quickly?
- Is the structure easy to explain in 3–5 lines?
- Can the block survive imperfect authoring?

7. Map outputs to repository artifacts
- Update or create `docs/blocks/{block-name}.md` with the final contract
- If this is a new block, ensure Sidekick sample content reflects the contract in:
	- `tools/sidekick/blocks/{block-name}.html`
	- `tools/sidekick/blocks/{block-name}.html.plain.html`

## Expected Output
Produce:
- Authoring contract summary
- Table structure definition
- Required/optional fields
- Fallback behavior
- Example authored block
- One invalid authored example and expected fallback behavior
- Decision rationale
- Repository artifact update plan (`docs/blocks/...`, and Sidekick sample files for new blocks)

## Minimum Acceptance Criteria

- At least one minimum valid example is defined
- At least one recommended example is defined
- At least one invalid example is defined with expected behavior
- Fallback behavior for missing optional fields is explicit
- Contract is documented in `docs/blocks/{block-name}.md`
- For new blocks, Sidekick sample content mirrors the contract

## Quick Rules
- Prefer fewer fields.
- Prefer semantic content over config-heavy tables.
- Do not require authors to understand implementation details.
- If the structure is hard to explain, simplify it.
- If default content works, do not force a block.
- If content is repeated and tabular, consider spreadsheets.
- Variants must be intentional and limited.
- Align with project language defaults defined in `AGENTS.md`.

## Handoff

After this skill is complete:
- Use `building-blocks-lite` to implement the block based on the contract
- Use `testing-lite` to validate behavior, resilience, and regressions

## Output Template

Use this template as the technical, executable translation of the request before implementation.
It must make scope, authoring structure, and fallback behavior explicit so block creation can proceed with minimal ambiguity.

### Authoring Contract
- Block name:
- Goal:
- Best authoring model:
- Variants:
- Required fields:
- Optional fields:
- Fallback rules:
- Invalid patterns to avoid:

### Example Authored Structure
[put example table here]

### Implementation Notes
- Expected selectors/data extraction:
- Graceful degradation expectations:
- Questions/risk areas: