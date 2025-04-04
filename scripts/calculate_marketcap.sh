#!/usr/bin/env bash

cd ../values

coinId="threefold-token"

url="https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd";

curl -sL ${url} \
-H 'Accept: application/json' | jq '."threefold-token".usd' | xargs printf "%.3f" > tft_value.md

supply=$(cat tft_supply.md)

value=$(cat tft_value.md)

TFT_MARKETCAP=$(echo "$supply * $value" | bc -l)

printf "%'.0f" $TFT_MARKETCAP > tft_marketcap.md