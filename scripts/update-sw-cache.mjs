#!/usr/bin/env node

import { createHash } from "crypto";
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

// Collect files from public/, excluding ignored entries, sorted for determinism
const files = readdirSync(PUBLIC_DIR)
  .filter((f) => !ignored.has(f) && !f.startsWith("."))
  .toSorted();

// Build urlsToCache: index.html gets both "/" and "/index.html", rest get "/<file>"
const urlsToCache = [];
if (files.includes("index.html")) {
  urlsToCache.push("/");
}
for (const file of files) {
  urlsToCache.push(`/${file}`);
}

// Hash the contents of all cached files (sorted order for determinism)
const hash = createHash("sha256");
for (const file of files) {
  hash.update(readFileSync(join(PUBLIC_DIR, file)));
}
const contentHash = hash.digest("hex").slice(0, 7);
const cacheName = `bang-search-${contentHash}`;

// Read the current sw.js
const sw = readFileSync(SW_PATH, "utf8");

if (!/const urlsToCache = \[[\s\S]*?\];/.test(sw)) {
  console.error("Could not find urlsToCache block in sw.js — no changes made.");
  process.exit(1);
}
if (!/const CACHE_NAME = ".*?";/.test(sw)) {
  console.error("Could not find CACHE_NAME in sw.js — no changes made.");
  process.exit(1);
}

// Check if anything actually changed
const currentCacheName = sw.match(/const CACHE_NAME = "(.*?)";/)[1];
if (currentCacheName === cacheName) {
  console.log(`No changes detected — CACHE_NAME remains ${cacheName}`);
  process.exit(0);
}

// Update urlsToCache and CACHE_NAME
const urlLines = urlsToCache.map((u) => `  "${u}"`).join(",\n");
const updated = sw
  .replace(/const urlsToCache = \[[\s\S]*?\];/, `const urlsToCache = [\n${urlLines},\n];`)
  .replace(/const CACHE_NAME = ".*?";/, `const CACHE_NAME = "${cacheName}";`);

writeFileSync(SW_PATH, updated, "utf8");

console.log(`Updated ${SW_PATH}:`);
console.log(`  CACHE_NAME: ${cacheName} (was ${currentCacheName})`);
console.log(`  ${urlsToCache.length} cache entries:`);
for (const u of urlsToCache) {
  console.log(`    ${u}`);
}
