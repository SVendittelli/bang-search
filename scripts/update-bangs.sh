#!/bin/bash
set -e

# Download latest bangs from DuckDuckGo
echo "Downloading latest bangs from DuckDuckGo..."
curl -s https://duckduckgo.com/bang.js -o /tmp/ddg-bangs.json

# Extract custom bangs (ones not in DDG list)
echo "Extracting custom bangs..."

# Create a temporary .mjs file to import bang.js as ES module
cat >extract-custom.mjs <<'EOF'
import { bangs as currentBangs } from './bang.js';
import { readFileSync, writeFileSync } from 'fs';

// Read DDG bangs
const ddgBangs = JSON.parse(readFileSync("/tmp/ddg-bangs.json", "utf8"));

// Find DDG bang triggers
const ddgTriggers = new Set(ddgBangs.map(b => b.t));

// Filter out custom bangs (not in DDG list)
const customBangs = currentBangs.filter(b => !ddgTriggers.has(b.t));

console.log(`Found ${customBangs.length} custom bangs: ${customBangs.map(b => b.t).join(", ")}`);

// Combine: custom bangs first, then DDG bangs
const combinedBangs = [...customBangs, ...ddgBangs];

// Write combined list
writeFileSync("/tmp/combined-bangs.json", JSON.stringify(combinedBangs));
EOF

node extract-custom.mjs
rm extract-custom.mjs

# Generate new bang.js with proper formatting
echo "Generating new bang.js..."
{
	echo '// This file was (mostly) ripped from https://duckduckgo.com/bang.js'
	echo ''
	echo 'export const bangs = '
	cat /tmp/combined-bangs.json | jq '.'
	echo ';'
} >bang.js

echo "Done! Updated bang.js with $(jq '. | length' /tmp/combined-bangs.json) total bangs"
