#!/usr/bin/env node

import { bangs as currentBangs } from "../bang.js";
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

// Find DDG bang triggers
const ddgTriggers = new Set(ddgBangs.map((b) => b.t));

// Filter out custom bangs (not in DDG list)
const customBangs = currentBangs.filter((b) => !ddgTriggers.has(b.t));

if (customBangs.length > 0) {
  console.log(
    `Found ${customBangs.length} custom bangs: ${customBangs.map((b) => b.t).join(", ")}`,
  );
} else {
  console.log("No custom bangs found");
}

// Combine: custom bangs first, then DDG bangs
const combinedBangs = [...customBangs, ...ddgBangs];

// Format the output file
const output = [
  "// This file was (mostly) ripped from https://duckduckgo.com/bang.js",
  "",
  "export const bangs = ",
  JSON.stringify(combinedBangs, null, 2),
  ";",
  "",
].join("\n");

// Write the updated bang.js
writeFileSync("bang.js", output, "utf8");

console.log(`Done! Updated bang.js with ${combinedBangs.length} total bangs`);
