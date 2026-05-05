# Bang Search justfile

set shell := ["zsh", "-uc"]
set windows-shell := ["pwsh.exe", "-NoLogo", "-Command"]

# List available recipes
default:
    @just --list

# Set up the repo
setup:
    git config core.hooksPath .githooks

# Run local development server with miniserve
dev:
    miniserve --index index.html public

# Update bangs from DuckDuckGo
update-bangs:
    node scripts/update-bangs.mjs

# Update the service worker cache file list
update-sw-cache:
    node scripts/update-sw-cache.mjs

# Test the update-bangs workflow locally using act
test-ci:
    gh act schedule --workflows .github/workflows/update-bangs.yml

# Run local development server on a specific port
dev-port port:
    miniserve --index index.html --port {{ port }} public
