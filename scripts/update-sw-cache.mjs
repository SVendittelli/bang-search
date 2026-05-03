#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = "public";
const SW_PATH = join(PUBLIC_DIR, "sw.js");
const ASSETS_IGNORE_PATH = join(PUBLIC_DIR, ".assetsignore");

// Parse .assetsignore — strip blank lines and comments
const ignored = new Set(
  readFileSync(ASSETS_IGNORE_PATH, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#")),
);

// Always exclude the service worker itself from its own cache list
ignored.add("sw.js");

// Collect files from public/, excluding ignored entries
const files = readdirSync(PUBLIC_DIR).filter(
  (f) => !ignored.has(f) && !f.startsWith("."),
);

// Build urlsToCache: index.html gets both "/" and "/index.html", rest get "/<file>"
const urlsToCache = [];
if (files.includes("index.html")) {
  urlsToCache.push("/");
}
for (const file of files.sort()) {
  urlsToCache.push(`/${file}`);
}

const urlLines = urlsToCache.map((u) => `  "${u}"`).join(",\n");
const newBlock = `const urlsToCache = [\n${urlLines},\n];`;

// Replace the existing urlsToCache block in sw.js
const sw = readFileSync(SW_PATH, "utf8");
const updated = sw.replace(
  /const urlsToCache = \[[\s\S]*?\];/,
  newBlock,
);

if (updated === sw) {
  console.error("Could not find urlsToCache block in sw.js — no changes made.");
  process.exit(1);
}

writeFileSync(SW_PATH, updated, "utf8");

console.log(`Updated ${SW_PATH} with ${urlsToCache.length} cache entries:`);
for (const u of urlsToCache) {
  console.log(`  ${u}`);
}
