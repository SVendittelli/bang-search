# AGENTS.md

## Project Overview

Simple no-build PWA for fast DuckDuckGo bang redirects. Single HTML page with vanilla JS modules.

## Architecture

- **No build system**: Direct ES modules, no package.json, no bundler
- **Entry point**: `index.html` → loads `main.js` as module
- **Core files**:
  - `main.js`: app logic, service worker registration, bang parsing/redirect
  - `bang.js`: generated file with 13,000+ bang definitions (exported as `bangs`)
  - `custom-bangs.js`: custom bang definitions merged during generation
  - `sw.js`: service worker for PWA offline caching
  - `global.css`: styling
  - `manifest.json`: PWA manifest

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

**No dev server needed** — open `index.html` directly in browser or run any static server:

```bash
just dev
# or manually:
miniserve --index index.html .
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
- **Change default bang**: modify `LS_DEFAULT_BANG` fallback in `main.js:57`
- **Update cache**: increment `CACHE_NAME` version in `sw.js:4`
- **Landing page**: HTML template in `main.js:18-41` (shown when no query)

## Deployment

Static site — deploy entire directory as-is to any CDN/hosting. No build step.

Hosted URL: `https://search.vendittelli.co.uk`
