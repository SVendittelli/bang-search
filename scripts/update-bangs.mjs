#!/usr/bin/env node

import { customBangs } from "../custom-bangs.js";
import { writeFileSync } from "fs";

console.log("Downloading latest bangs from DuckDuckGo...");

// Fetch the latest bangs from DuckDuckGo
const response = await fetch("https://duckduckgo.com/bang.js");
if (!response.ok) {
  console.error(
    `Failed to fetch bangs: ${response.status} ${response.statusText}`,
  );
  process.exit(1);
}

const ddgBangs = await response.json();
console.log(`Downloaded ${ddgBangs.length} bangs from DuckDuckGo`);

if (customBangs.length > 0) {
  console.log(
    `Merging ${customBangs.length} custom bangs: ${customBangs.map((b) => b.t).join(", ")}`,
  );
}

// Combine: custom bangs first, then DDG bangs
const combinedBangs = [...customBangs, ...ddgBangs];

// Format the output file (minified)
const output = `// This file was (mostly) ripped from https://duckduckgo.com/bang.js

export const bangs = ${JSON.stringify(combinedBangs)};
`;

// Write the updated bang.js
writeFileSync("public/bang.js", output, "utf8");

console.log(
  `Done! Updated public/bang.js with ${combinedBangs.length} total bangs`,
);
