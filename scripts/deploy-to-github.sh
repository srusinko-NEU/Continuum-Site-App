#!/bin/bash
# Helper script to link and push Continuum DX to your GitHub repository
set -e

if [ -z "$1" ]; then
  echo "=========================================================="
  echo " Continuum DX Advisory -> GitHub Push Helper"
  echo "=========================================================="
  echo "Usage: ./deploy-to-github.sh <YOUR_GITHUB_REPO_URL>"
  echo "Example: ./deploy-to-github.sh https://github.com/your-username/continuum-dx.git"
  echo ""
  exit 1
fi

REPO_URL="$1"

echo "Linking repository to $REPO_URL..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

echo "Pushing main branch..."
git push -u origin main

echo ""
echo "=========================================================="
echo " Pushed to GitHub! Live at continuum-dx.com via IONOS."
echo "=========================================================="
