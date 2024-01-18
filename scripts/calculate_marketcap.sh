#!/usr/bin/env bash

cd src/values

coinId="threefold-token"

url="https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd";

curl -sL ${url} \
-H 'Accept: application/json' | jq '."threefold-token".usd' > tft_value.md

liquidity=$(cat tft_liquidity.md)

value=$(cat tft_value.md)

CU_MTFT_HOUR=$(echo "$liquidity * $value" | bc -l)

printf "%.2f" $CU_MTFT_HOUR > CU_MTFT_HOUR.md