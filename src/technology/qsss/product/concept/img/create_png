#!/bin/bash

for name in ./*.mmd
do
	output=$(basename $name mmd)png
	echo $output
	mmdc -i $name -o $output -w 4096 -H 2160 -b transparant
	echo $name
done
