#!/usr/bin/env bash

cd src/threefold_token/token_overview/

coinId="threefold-token"

url="https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd";

curl -L -X GET ${url} \
-H 'Accept: application/json' | jq '."threefold-token".usd' > tft_value.md

liquidity=$(cat tft_liquidity.md)

value=$(cat tft_value.md)

product=$(echo "$liquidity * $value" | bc -l)

printf "%.2f" $product > tft_marketcap.md

printf "%.4f" $value > tft_value.md