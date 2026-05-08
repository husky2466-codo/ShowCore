# ShowCore [RETIRED]

**Status:** Retired. This repository has been consolidated to a single specification document.

ShowCore was a technician discovery marketplace connecting AV (audio-visual) professionals with live event companies — verified profiles, transparent pay bands, show-proof verification, XP-based tier progression, and bidirectional reviews.

## What's here

- [`MASTER_SPEC.md`](./MASTER_SPEC.md) — full project specification: vision, target users, feature surface, tech stack, data model, integrations, design decisions, known issues, and rebuild guidance.

## Pre-wipe history

The complete codebase as it stood at retirement (frontend, backend, Prisma schema, section specs, instructions) is preserved at the git tag [`pre-wipe-final`](../../tree/pre-wipe-final).

To recover it locally:

```bash
git clone https://github.com/husky2466-codo/ShowCore.git
cd ShowCore
git checkout pre-wipe-final
```

## Rebuilding

Future agents or humans rebuilding ShowCore should start from `MASTER_SPEC.md` (sections 4, 6, and 11 in particular) and reference the `pre-wipe-final` tag for the original Prisma schema and section-by-section spec files.
