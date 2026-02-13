#!/bin/bash

# This script creates a companion-website branch from copilot/companion-website
# Run this script to create the branch name required for GitHub Pages setup

set -e

echo "Creating companion-website branch from copilot/companion-website..."

# Fetch latest changes
git fetch origin

# Check if companion-website already exists
if git rev-parse --verify companion-website >/dev/null 2>&1; then
    echo "Branch 'companion-website' already exists locally."
    echo "To recreate it, first run: git branch -D companion-website"
    exit 1
fi

# Create the branch from remote
git checkout -b companion-website origin/copilot/companion-website

# Push to remote
git push -u origin companion-website

echo ""
echo "✅ Successfully created companion-website branch!"
echo ""
echo "Next steps:"
echo "1. Go to GitHub repository Settings → Pages"
echo "2. Select 'Deploy from a branch'"
echo "3. Choose branch: companion-website"
echo "4. Choose folder: / (root)"
echo "5. Click Save"
echo ""
echo "Your site will be available at: https://sangfrois.github.io/DAT_GPT/"
