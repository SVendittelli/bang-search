# AGENTS.md

## Project Overview

Simple no-build PWA for fast DuckDuckGo bang redirects. Single HTML page with vanilla JS modules.

## Project Conventions

### Git Workflow

- **NEVER commit or push without explicit user permission**
- **Always ask before creating commits**, even if changes are complete
- **Use Conventional Commits** format for all commit messages:
  - Format: `<type>: <description>`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
  - Example: `refactor: move web assets to public/ directory`
- Include detailed bullet points in commit body when relevant

## Architecture

- **No build system**: Direct ES modules, no package.json, no bundler
- **Entry point**: `public/index.html` → loads `main.js` as module
- **Core files** (all in `public/`):
  - `main.js`: app logic, service worker registration, bang parsing/redirect
  - `bang.js`: generated file with 13,000+ bang definitions (exported as `bangs`)
  - `sw.js`: service worker for PWA offline caching
  - `global.css`: styling
  - `manifest.json`: PWA manifest
- **Build files** (not deployed):
  - `custom-bangs.js`: custom bang definitions merged during generation

## Key Technical Details

### Bang Data Format

`bang.js` exports one array `bangs` where each entry has:

- `t`: trigger (the shortcode like "g", "gh")
- `d`: domain
- `u`: URL template with `{{{s}}}` placeholder for search query
- `c`, `s`, `sc`, `r`: metadata (category, name, subcategory, rank)

### Query Parsing Logic

- Query format: `!<bang> <search terms>`
- Falls back to `!g` (Google) if no bang specified (stored in localStorage as `default-bang`)
- Special case: bare bang like `!gh` redirects to domain root, not search URL
- URL encoding: `%2F` → `/` to support formats like `!ghr username/repo`

### Development & Testing

**No dev server needed** — open `public/index.html` directly in browser or run any static server:

```bash
just dev
# or manually:
miniserve --index index.html public
```

**Service worker caching** applies immediately on install. To test changes, clear cache or bump `CACHE_NAME` in `sw.js`.

**Update bangs** from DuckDuckGo (preserves custom bangs):

```bash
just update-bangs
# or manually:
node scripts/update-bangs.mjs
```

## Common Edits

- **Add/modify bangs**: edit `custom-bangs.js` array, then run `just update-bangs` to regenerate `bang.js`
- **Change default bang**: modify `LS_DEFAULT_BANG` fallback in `public/main.js:57`
- **Update cache**: increment `CACHE_NAME` version in `public/sw.js:4`
- **Landing page**: HTML template in `public/main.js:18-41` (shown when no query)

## Deployment

Static site deployed to Cloudflare Pages. Deploys `public/` directory only (excludes scripts, git history, etc). No build step.

Hosted URL: `https://search.vendittelli.co.uk`
