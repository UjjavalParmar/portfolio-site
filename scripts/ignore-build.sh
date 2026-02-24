#!/bin/bash

# Vercel Ignored Build Step Script
# Exit 0 = Skip build | Exit 1 = Build

echo "Checking if build is needed..."

# Files/patterns that should NOT trigger a build
IGNORE_PATTERNS=(
  "README.md"
  "LICENSE"
  "*.md"
  ".gitignore"
  ".env.example"
  "docs/*"
  ".github/*"
)

# Get changed files between current and previous commit
CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null)

# If we can't get diff (first commit), always build
if [ -z "$CHANGED_FILES" ]; then
  echo "Unable to determine changes. Proceeding with build..."
  exit 1
fi

echo "Changed files:"
echo "$CHANGED_FILES"
echo ""

# Check if any changed file requires a build
BUILD_REQUIRED=false

for file in $CHANGED_FILES; do
  SHOULD_IGNORE=false
  
  for pattern in "${IGNORE_PATTERNS[@]}"; do
    if [[ "$file" == $pattern ]]; then
      SHOULD_IGNORE=true
      break
    fi
  done
  
  if [ "$SHOULD_IGNORE" = false ]; then
    echo "Build required for: $file"
    BUILD_REQUIRED=true
    break
  fi
done

if [ "$BUILD_REQUIRED" = true ]; then
  echo "Proceeding with build..."
  exit 1
else
  echo "Only docs/config changed. Skipping build!"
  exit 0
fi
