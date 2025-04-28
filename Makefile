.PHONY: build serve clean install update-values dev

# Default target
all: build

# Update values from external sources and calculate pricing
update-values:
	@echo "Updating values from external sources..."
	cd scripts && bash calculate_marketcap.sh
	@echo "Calculating TFT pricing based on USD values..."
	cd scripts && bash calculate_cloud_pricing.sh
	@echo "Generating values.json file for component use..."
	chmod +x scripts/generate_values_json.sh
	cd scripts && bash generate_values_json.sh
	@echo "Values updated successfully."

# Install dependencies
install:
	yarn install

# Build the Docusaurus site (with updated values)
build: install update-values
	@echo "Building site with updated values..."
	yarn build

# Serve the built site locally
serve: build
	yarn serve

# Run development server with updated values
dev: update-values
	@echo "Starting development server with updated values..."
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
	@echo "  make update-values - Update pricing values from external sources"
	@echo "  make build         - Update values and build the site"
	@echo "  make dev           - Update values and start development server"
	@echo "  make serve         - Build and serve the site locally"
	@echo "  make clean         - Clean build artifacts"
