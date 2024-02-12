#!/usr/bin/env bash

cd src/values

value=$(cat tft_value.md)

CU=$(cat CU_MUSD_HOUR.md)
CUTFT=$(echo "$CU / $value" | bc -l)
printf "%.2f" $CUTFT > CU_MTFT_HOUR.md

SU=$(cat SU_MUSD_HOUR.md)
SUTFT=$(echo "$SU / $value" | bc -l)
printf "%.2f" $SUTFT > SU_MTFT_HOUR.md

NU=$(cat NU_MUSD_HOUR.md)
NUTFT=$(echo "$NU / $value" | bc -l)
printf "%.2f" $NUTFT > NU_MTFT_HOUR.md

IP=$(cat IP_MUSD_HOUR.md)
IPTFT=$(echo "$IP / $value" | bc -l)
printf "%.2f" $IPTFT > IP_MTFT_HOUR.md

NAME=$(cat NAME_MUSD_HOUR.md)
NAME=$(echo "$NAME / $value" | bc -l)
printf "%.2f" $NAME > NAME_MTFT_HOUR.md

DNAME=$(cat DNAME_MUSD_HOUR.md)
DNAME=$(echo "$DNAME / $value" | bc -l)
printf "%.2f" $DNAME > DNAME_MTFT_HOUR.md