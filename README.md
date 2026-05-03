# Bang Search

DuckDuckGo's bang redirects are slow, so let's use something cacheable. Add the following URL as a custom search engine to your browser for better performance.

```
https://search.vendittelli.co.uk/?q=%s
```

## Features

- **No build system**: Direct ES modules, pure vanilla JavaScript
- **13,000+ bangs**: All DuckDuckGo bangs plus custom definitions
- **PWA with offline support**: Service worker caching for instant loads
- **Fast redirects**: Client-side parsing and redirect, no server processing
- **Custom bangs**: Add your own shortcuts via `custom-bangs.js`

## Development

After cloning set up the pre-commit hooks:

```bash
just setup
```

Start a local development server:

```bash
just dev
# or manually:
miniserve --index index.html public
```

Update bangs from DuckDuckGo (preserves custom bangs):

```bash
just update-bangs
```

## Deployment

Deployed to **Cloudflare Pages** via GitHub integration. Configure build settings:

- **Build command**: (leave empty)
- **Build output directory**: `public`

Every push to `main` automatically triggers a new deployment.

## Inspiration

- [Unduck](https://github.com/T3-Content/unduck) by [Theo Browne](https://x.com/theo)
