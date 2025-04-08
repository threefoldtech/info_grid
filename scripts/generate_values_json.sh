#!/usr/bin/env bash

# Script to generate a values.json file from the markdown files in the values directory
# This will be used by the Include.js component

# Navigate to the values directory
cd ../values

# Create a temporary directory for the JSON file
mkdir -p ../src/data

# Start the JSON object
echo "{" > ../src/data/values.json

# Process each markdown file in the values directory
first=true
for file in *.md; do
  # Skip if not a file
  [ -f "$file" ] || continue
  
  # Extract the filename without extension
  filename="${file%.md}"
  
  # Read the content of the file
  content=$(cat "$file" | tr -d '\n')
  
  # Add a comma before all but the first entry
  if [ "$first" = true ]; then
    first=false
  else
    echo "," >> ../src/data/values.json
  fi
  
  # Add the entry to the JSON file (with proper escaping for JSON)
  echo "  \"$filename\": \"$content\"" >> ../src/data/values.json
done

# Close the JSON object
echo "}" >> ../src/data/values.json

echo "Generated values.json with data from $(ls -1 *.md | wc -l) markdown files"
