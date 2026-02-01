#!/bin/bash

echo "🚀 Deploying optimized Docker image to Koyeb..."
echo ""

# Stage all changes
git add .

# Commit
git commit -m "fix: optimize Docker image for Koyeb scale-to-zero

- Remove unused dependencies (@nestjs/platform-express, crypto, @types/uuid)
- Add multi-stage Dockerfile with production-only deps
- Use dumb-init for proper SIGTERM handling
- Run node directly instead of through npm
- Aggressive cache cleaning to reduce image size
- Expected image size: ~150-200MB (down from 500MB-1GB)

Fixes 'Image download failure' on scale-to-zero restart"

# Push
git push

echo ""
echo "✅ Pushed to repository!"
echo ""
echo "📋 Next steps:"
echo "1. Go to Koyeb dashboard"
echo "2. Ensure build method is set to 'Dockerfile'"
echo "3. Wait for deployment (3-5 minutes)"
echo "4. Test scale-to-zero by waiting 5 minutes"
echo "5. Send a request to wake it up"
echo ""
echo "Expected results:"
echo "- Build completes successfully"
echo "- Image size: ~150-200MB"
echo "- Wake-up time: 5-15 seconds"
echo "- No more 'Image download failure' errors"
