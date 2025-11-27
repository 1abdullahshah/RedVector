#!/bin/bash

# RedVector Deployment Script
# Automates GitHub Repo Creation & Vercel Deployment

echo "🐺 Initializing RedVector Deployment Protocol..."

# 1. GitHub Setup
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) could not be found. Please install it."
    exit 1
fi

echo "🔍 Checking GitHub Authentication..."
if ! gh auth status &> /dev/null; then
    echo "⚠️  You are not logged into GitHub."
    echo "👉 Please follow the prompts to log in:"
    gh auth login
fi

echo "📦 Creating Private GitHub Repository 'redvector'..."
# Try to create repo, ignore error if it already exists
gh repo create redvector --private --source=. --remote=origin --push || echo "ℹ️  Repo might already exist or push failed. Continuing..."

# 2. Vercel Setup
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI could not be found. Installing via npm..."
    npm install -g vercel
fi

echo "🔍 Checking Vercel Authentication..."
# Vercel whoami returns 1 if not logged in
if ! npx vercel whoami &> /dev/null; then
    echo "⚠️  You are not logged into Vercel."
    echo "👉 Please follow the prompts to log in:"
    npx vercel login
fi

echo "🚀 Deploying to Vercel..."
npx vercel --prod

echo "✅ MISSION COMPLETE. RedVector is Live."
