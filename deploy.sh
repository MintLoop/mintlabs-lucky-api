#!/bin/bash

# Lucky Number Generator - Deployment Script
# This script helps deploy both backend and frontend to Vercel

set -e

echo "🚀 Lucky Number Generator Deployment Script"
echo "=========================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy backend
echo "📦 Deploying FastAPI backend..."
cd mintlabs-lucky-api
echo "🔗 Please set these environment variables in Vercel dashboard after deployment:"
echo "   - DATABASE_URL (from Supabase)"
echo "   - SUPABASE_URL (from Supabase)"
echo "   - SUPABASE_ANON_KEY (from Supabase)"
echo ""
vercel --prod
API_URL=$(vercel --prod 2>/dev/null | grep -o 'https://[^ ]*\.vercel\.app' | tail -1)
echo "✅ Backend deployed to: $API_URL"

# Deploy frontend
echo ""
echo "🎨 Deploying Astro frontend..."
cd ../mintlabs-lucky-frontend
echo "🔗 Please set these environment variables in Vercel dashboard:"
echo "   - PUBLIC_API_BASE: $API_URL"
echo "   - PUBLIC_ADSENSE_CLIENT: ca-pub-XXXXXXXXXXXXXXXX (optional)"
echo ""
vercel --prod
FRONTEND_URL=$(vercel --prod 2>/dev/null | grep -o 'https://[^ ]*\.vercel\.app' | tail -1)
echo "✅ Frontend deployed to: $FRONTEND_URL"

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "Frontend URL: $FRONTEND_URL"
echo "API URL: $API_URL"
echo ""
echo "📋 Next Steps:"
echo "1. Set environment variables in Vercel dashboard"
echo "2. Configure DNS: lucky.mintloop.dev → $FRONTEND_URL"
echo "3. Test the application"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
