#!/usr/bin/env bash

cd src/threefold_token/token_overview/

coinId="threefold-token"

url="https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd";

curl -L -X GET ${url} \
-H 'Accept: application/json' | jq '."threefold-token".usd' > tft_value.md

var1=$(cat tft_liquidity.md) 

var2=$(cat tft_value.md)

product=$(echo "$var1 * $var2" | bc -l)

echo "$product" | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > tft_marketcap.md

echo "$var2" | sed -re 's/([0-9]+\.[0-9]{4})[0-9]+/\1/g' > tft_value.md
