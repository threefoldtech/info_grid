build:
	./scripts/generate_wallets.sh
	./scripts/calculate_marketcap.sh
	./scripts/calculate_cloud_pricing.sh
	mdbook build -d docs

serve:
	./scripts/generate_wallets.sh
	./scripts/calculate_marketcap.sh
	./scripts/calculate_cloud_pricing.sh
	mdbook serve -o -d docs -p 3004