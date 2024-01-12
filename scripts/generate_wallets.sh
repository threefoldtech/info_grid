#!/usr/bin/env bash

cd src/threefold_token/token_overview/special_wallets/

curl -L -X GET 'https://horizon.stellar.org/accounts/GA7OPN4A3JNHLPHPEWM4PJDOYYDYNZOM7ES6YL3O7NC3PRY3V3UX6ANM' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GA7OPN4A3JNHLPHPEWM4PJDOYYDYNZOM7ES6YL3O7NC3PRY3V3UX6ANM.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GDSKFYNMZWTB3V5AN26CEAQ27643Q3KB4X6MY4UTO2LIIDFND4SPQZYU' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GDSKFYNMZWTB3V5AN26CEAQ27643Q3KB4X6MY4UTO2LIIDFND4SPQZYU.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GBQHN7RL4LSRPR2TT74ID2UJPZ2AXCHQY2WKGCTDLJM3NXVJ7GQHUCOD' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GBQHN7RL4LSRPR2TT74ID2UJPZ2AXCHQY2WKGCTDLJM3NXVJ7GQHUCOD.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GBTPAXXP6534UPC4MLNGFGJWCD6DNSRVIPPOZWXAQAWI4FKTLOJY2A2S' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GBTPAXXP6534UPC4MLNGFGJWCD6DNSRVIPPOZWXAQAWI4FKTLOJY2A2S.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GB2C5HCZYWNGVM6JGXDWQBJTMUY4S2HPPTCAH63HFAQVL2ALXDW7SSJ7' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GB2C5HCZYWNGVM6JGXDWQBJTMUY4S2HPPTCAH63HFAQVL2ALXDW7SSJ7.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GDLVIB44LVONM5K67LUPSFZMSX7G2RLYVBM5MMHUJ4NAQJU7CH4HBJBO' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GDLVIB44LVONM5K67LUPSFZMSX7G2RLYVBM5MMHUJ4NAQJU7CH4HBJBO.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GDKXTUYNW4BJKDM2L7B5XUYFUISV52KUU4G7VPNLF4ZSIKBURM622YPZ' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GDKXTUYNW4BJKDM2L7B5XUYFUISV52KUU4G7VPNLF4ZSIKBURM622YPZ.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GDIJY6K2BBRIRX423ZFUYKKFDN66XP2KMSBZFQSE2PSNDZ6EDVQTRLSU' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GDIJY6K2BBRIRX423ZFUYKKFDN66XP2KMSBZFQSE2PSNDZ6EDVQTRLSU.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GCWHWDRXYPXQAOYMQKB66SZPLM6UANKGMSL4SP7LSOIA6OTTOYQ6HBIH' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GCWHWDRXYPXQAOYMQKB66SZPLM6UANKGMSL4SP7LSOIA6OTTOYQ6HBIH.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GBV734I2SV4YDDPVJMYXU3IZ2AIU5GEAJRAD4E4BQG7CA2N63NXSPMD6' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GBV734I2SV4YDDPVJMYXU3IZ2AIU5GEAJRAD4E4BQG7CA2N63NXSPMD6.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GAI4C2BGOA3YHVQZZW7OW4FHOGGYWTUBEVNHB6MW4ZAFG7ZAA7D5IPC3' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GAI4C2BGOA3YHVQZZW7OW4FHOGGYWTUBEVNHB6MW4ZAFG7ZAA7D5IPC3.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GCEJ7DMULFTT25UH4FAAGOZ6KER4WXAYQGJUSIITQD527DGTKSXKBQGR' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GCEJ7DMULFTT25UH4FAAGOZ6KER4WXAYQGJUSIITQD527DGTKSXKBQGR.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GAQXBLFG4BZGIVY6DBJVWE5EAP3UNHMIA2PYCUVLY2JUSPVWPUF36BW4' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GAQXBLFG4BZGIVY6DBJVWE5EAP3UNHMIA2PYCUVLY2JUSPVWPUF36BW4.md

curl -L -X GET 'https://horizon.stellar.org/accounts/GAUGOSYLCX7JZTQYF2K7RIMHFWKSA3WSI2OQ4IRKXMDMVE6ABJIJMFQR' \
-H 'Accept: application/json' | jq --raw-output '.balances[] | select(.asset_code == "TFT") | .balance' | sed -re 's/([0-9]+\.[0-9]{2})[0-9]+/\1/g' > GAUGOSYLCX7JZTQYF2K7RIMHFWKSA3WSI2OQ4IRKXMDMVE6ABJIJMFQR.md