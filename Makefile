build:
	./scripts/generate_wallets.sh
	./scripts/calculate_marketcap.sh
	mdbook build

serve:
	./scripts/generate_wallets.sh
	./scripts/calculate_marketcap.sh
	mdbook serve -o