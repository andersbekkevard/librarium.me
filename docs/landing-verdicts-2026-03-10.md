# Landing-page verdicts, 10 March 2026

Anders' verdicts on seven landing-page variants (branches `landing/*`), as his OpenClaw
assistant recorded them on 10 March 2026 in `memory/projects/librarium.md` of the
openclaw-workspace repository (folded into the attic repository as
`2026-03-openclaw-workspace/` on 12 November 2026). Copied unchanged on 12 November 2026
so the next agent working on the landing page does not rebuild variants he rejected. Quotes
are his words as the assistant wrote them down, not a transcript; the "Next steps" were
open on that date.


### Color Palette (IDEA - from warm-library variant)
`#F5C54D` (golden amber) + `#FFF8F0` (cream) + `#FFF` (white) + `#244633` (forest green) + `#789D72` (sage green)
→ Anders called this "inspirational." Propose this as the canonical color palette for future designs going forward.

### Design References & Influences
- **Michael Riddering** (Maven.com founding designer, Figma Academy creator) - key design inspiration
- **Kinopio.club** - playful collage minimalism, loved by Anders for non-dev friendliness
- **Maven.com** - dark editorial minimalism, "incredible design"
- **Firecrawl.dev** - numbered chapter grid, dev-clean with alternating sub-grids
- **Native.inc** - editorial bold, typography-first, neon accent on dark
- **Are.na** - functional minimalism, devtool aesthetic
- **Literal.club** - direct competitor, book cover carousel, social proof wall
- **"Thin lines" pattern** - the subtle hairline grid/divider lines that Maven, Altor.com, Firecrawl, and Superhuman use. Anders wants a new design variant combining Maven's style + green palette + these thin lines.
- **Anthropic.com** - UI inspiration reference (https://www.anthropic.com/)

### 7 Parallel Variants Generated (2026-03-10)
All on `landing/*` branches with worktrees at `.worktrees/librarium-app/landing/`.

| Port | Branch | Variant | Anders' Verdict |
|------|--------|---------|-----------------|
| 3000 | landing/reading-nook | Kinopio-style playful collage | Not reviewed yet |
| 3001 | landing/literary-magazine | Maven-style dark editorial | "Don't like it, nor its vibe" - DROPPED |
| 3002 | landing/guided-chapter | Firecrawl-style numbered chapters | "Beautiful." Fixes: FAQ black bg bug, top black bar bug, shrink content width ~10% so scroll sidebar breathes, chapter 3 bento layout is great |
| 3003 | landing/bold-shelf | Native-style bold typography | "Like the vibe" but middle sections too boring - needs images/figures, product demo, book covers. Future consideration |
| 3004 | landing/warm-library | Existing brand refined | "Boring design" BUT color scheme is inspirational (see palette above) |
| 3005 | landing/the-index | Are.na-style devtool minimal | Not reviewed yet |
| 3006 | landing/literal-clone | Literal.club clone | "Absolutely great!" Love the book sliding roulette. TODO: clickable books, make claims truthful, fewer/no fake social media posts, replace scroll-down segments with design elements from other variants |

### Next Steps
- [ ] Fix guided-chapter bugs (FAQ, top bar, sidebar spacing)
- [ ] Improve literal-clone (clickable books, truthful content, less social media, better lower sections)
- [ ] Consider bold-shelf improvements (add imagery)
- [ ] **NEW VARIANT WANTED:** Maven.com-inspired, but with green palette + thin hairline grid lines (the lines Maven, Altor.com, Firecrawl, Superhuman use)
- [ ] **NEW VARIANT WANTED:** Kinopio.club clone - direct recreation adapted for Librarium
- [ ] Possible hybrid: literal-clone top (book roulette) + guided-chapter middle (bento layout) + bold-shelf typography energy

### Prompting Insight (Anthropic)
Prompt at "mid-altitude" - not hex codes, not vibes. Specify design *dimensions*: typography, color palette, animation philosophy, background treatment, cultural reference, anti-patterns. Without this, agents converge on "Inter font, purple gradient, white background."

### Frontend Sprint Runbook (2026-03-11)
- Created `runbooks/frontend-sprint.md` - the generalized, framework-agnostic version of the workflow we used for the first sprint.
- Design themes library: `runbooks/design-themes/` (13 proven + 22 unproven themes with full design dimensions and inspiration sites).
- Frontend skills library: `runbooks/frontend-skills/` (18 skills injected into agent prompts, not installed into .claude/).
- Key insight: skills are pasted directly into agent prompts as a "skills block" at the top - more reliable than telling agents to "use /skill".
- Clone candidates: rollups.com (modular grid).
