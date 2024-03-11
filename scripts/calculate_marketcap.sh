#!/usr/bin/env bash

cd src/values

coinId="threefold-token"

url="https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd";

curl -sL ${url} \
-H 'Accept: application/json' | jq '."threefold-token".usd' | xargs printf "%.3f" > tft_value.md

liquidity=$(cat tft_liquidity.md)

value=$(cat tft_value.md)

TFT_MARKETCAP=$(echo "$liquidity * $value" | bc -l)

printf "%'.0f" $TFT_MARKETCAP > tft_marketcap.md