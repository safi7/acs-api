#!/bin/bash

echo "🔨 Building Docker image..."
docker build -t acs-api:test .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📊 Image size:"
    docker images acs-api:test --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
    echo ""
    echo "🔍 Image layers:"
    docker history acs-api:test --human=true --format "table {{.CreatedBy}}\t{{.Size}}"
else
    echo "❌ Build failed!"
    exit 1
fi
