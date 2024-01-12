build:
	chmod +x ./scripts/generate_wallets.sh
	chmod +x ./scripts/calculate_marketcap.sh
	./scripts/generate_wallets.sh
	./scripts/calculate_marketcap.sh
	mdbook build -d docs

serve:
	chmod +x ./scripts/generate_wallets.sh
	chmod +x ./scripts/calculate_marketcap.sh
	./scripts/generate_wallets.sh
	./scripts/calculate_marketcap.sh
	mdbook serve -o