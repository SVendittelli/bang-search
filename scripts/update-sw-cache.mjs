#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

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

// Get the current git commit hash (short)
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
const cacheName = `bang-search-${commitHash}`;

const urlLines = urlsToCache.map((u) => `  "${u}"`).join(",\n");
const newUrlsBlock = `const urlsToCache = [\n${urlLines},\n];`;
const newCacheName = `const CACHE_NAME = "${cacheName}";`;

// Replace both CACHE_NAME and urlsToCache in sw.js
let sw = readFileSync(SW_PATH, "utf8");

if (!/const urlsToCache = \[[\s\S]*?\];/.test(sw)) {
  console.error("Could not find urlsToCache block in sw.js — no changes made.");
  process.exit(1);
}
const updatedUrls = sw.replace(/const urlsToCache = \[[\s\S]*?\];/, newUrlsBlock);

if (!/const CACHE_NAME = ".*?";/.test(updatedUrls)) {
  console.error("Could not find CACHE_NAME in sw.js — no changes made.");
  process.exit(1);
}
const updated = updatedUrls.replace(/const CACHE_NAME = ".*?";/, newCacheName);

writeFileSync(SW_PATH, updated, "utf8");

console.log(`Updated ${SW_PATH}:`);
console.log(`  CACHE_NAME: ${cacheName}`);
console.log(`  ${urlsToCache.length} cache entries:`);
for (const u of urlsToCache) {
  console.log(`    ${u}`);
}
