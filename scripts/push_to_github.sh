#!/bin/bash
# Push master keynote release to GitHub (srusinko-NEU/Continuum-Site-App)
set -e

if [ -z "$1" ]; then
  echo "Usage: ./scripts/push_to_github.sh <GITHUB_PAT>"
  echo "Example: ./scripts/push_to_github.sh github_pat_xxxx"
  exit 1
fi

TOKEN="$1"
REPO="github.com/srusinko-NEU/Continuum-Site-App.git"

git config --global --add safe.directory /app/applet || true
git config user.name "Sean Rusinko"
git config user.email "sean@continuum-dx.com"

echo "Configuring remote authenticated repository..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://${TOKEN}@${REPO}"

echo "Pushing latest master release to GitHub..."
git push origin main:main --force

echo ""
echo "=========================================================="
echo " SUCCESS! Master release pushed to srusinko-NEU/Continuum-Site-App."
echo " GitHub Pages is now deploying to https://continuum-dx.com"
echo "=========================================================="
