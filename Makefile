.PHONY: build serve clean install

# Default target
all: build

# Install dependencies
install:
	npm install

# Build the Docusaurus site
build: install
	npm run build

# Serve the built site locally
serve: build
	npm run serve

# Clean build artifacts
clean:
	npm run clear

# Help information
help:
	@echo "Makefile for building the Docusaurus site"
	@echo ""
	@echo "Available commands:"
	@echo "  make install  - Install dependencies"
	@echo "  make build    - Build the site"
	@echo "  make serve    - Build and serve the site locally"
	@echo "  make clean    - Clean build artifacts"
