# Scripts

## update-bangs.mjs

Updates `bang.js` with the latest bangs from DuckDuckGo while preserving custom bangs.

### Usage

```bash
node scripts/update-bangs.mjs
```

### What it does

1. Downloads the latest bang list from `https://duckduckgo.com/bang.js`
2. Extracts custom bangs from the current `bang.js` (ones not in the DuckDuckGo list)
3. Combines custom bangs (at the top) with the DDG list
4. Formats and writes the updated `bang.js` with proper ES module export syntax

### Automated Updates

This script runs automatically daily via GitHub Actions (`.github/workflows/update-bangs.yml`). When changes are detected, a PR is automatically created.

### Manual Trigger

You can manually trigger the workflow from the GitHub Actions tab or run the script locally with Node.js.
