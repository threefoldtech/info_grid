.PHONY: build serve clean install prepare-data generate-search prebuild dev

# Default target
all: build

# Generate dynamic pricing values from external sources
prepare-data:
	@echo "Updating values from external sources..."
	cd scripts && bash calculate_marketcap.sh
	@echo "Calculating TFT pricing based on USD values..."
	cd scripts && bash calculate_cloud_pricing.sh
	@echo "Generating values.json file for component use..."
	chmod +x scripts/generate_values_json.sh
	cd scripts && bash generate_values_json.sh
	@echo "Values data prepared successfully."

# Generate search index from documentation content
generate-search:
	@echo "Generating search index..."
	npm run generate-search
	@echo "Search index generated successfully."

# Run all pre-build data generation tasks
prebuild: prepare-data generate-search
	@echo "All pre-build tasks completed."

# Install dependencies
install:
	yarn install

# Build the Docusaurus site (with all generated data)
build: install prebuild
	@echo "Building site with generated data..."
	yarn build

# Serve the built site locally
serve: build
	yarn serve

# Run development server with generated data
dev: prebuild
	@echo "Starting development server with generated data..."
	yarn start

# Clean build artifacts
clean:
	yarn clear

# Help information
help:
	@echo "Makefile for building the Docusaurus site"
	@echo ""
	@echo "Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make prepare-data  - Generate pricing values from external sources"
	@echo "  make generate-search - Generate search index from documentation"
	@echo "  make prebuild      - Run all pre-build data generation tasks"
	@echo "  make build         - Generate data and build the site"
	@echo "  make dev           - Generate data and start development server"
	@echo "  make serve         - Build and serve the site locally"
	@echo "  make clean         - Clean build artifacts"
