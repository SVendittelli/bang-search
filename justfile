# Bang Search justfile

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

# Run local development server on a specific port
dev-port port:
    miniserve --index index.html --port {{ port }} public
