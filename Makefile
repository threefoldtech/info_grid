build:
	./scripts/generate_wallets.sh
	./scripts/calculate_marketcap.sh
	mdbook build -d docs

serve:
	./scripts/generate_wallets.sh
	./scripts/calculate_marketcap.sh
	mdbook serve -o -d docs -p 3004