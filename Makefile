.PHONY: build serve clean install

# Default target
all: build

# Install dependencies
install:
	yarn install

# Build the Docusaurus site
build: install
	yarn build

# Serve the built site locally
serve: build
	yarn serve

# Clean build artifacts
clean:
	yarn clear

# Help information
help:
	@echo "Makefile for building the Docusaurus site"
	@echo ""
	@echo "Available commands:"
	@echo "  make install  - Install dependencies"
	@echo "  make build    - Build the site"
	@echo "  make serve    - Build and serve the site locally"
	@echo "  make clean    - Clean build artifacts"
