# Deployment Optimization Summary

## Root Cause Found! 🎯

**The logs show:**
```
npm error command sh -c node --max-old-space-size=1024 node_modules/@nestjs/cli/bin/nest.js start
```

**Problem:** Koyeb was using buildpacks and running `npm start` which:
1. Uses NestJS CLI (requires dev dependencies)
2. Doesn't handle SIGTERM properly for scale-to-zero
3. Creates large images that fail to download on restart

## Changes Made

### 1. Removed Unused Dependencies (saves ~15-20MB)
- ❌ `@nestjs/platform-express` - Not used (you use Fastify)
- ❌ `crypto` package - Node.js has built-in crypto module
- ❌ `@types/uuid` - Not used anywhere

### 2. Created Optimized Dockerfile
**Multi-stage build:**
- Stage 1: Build with all dependencies
- Stage 2: Production with only runtime dependencies

**Key optimizations:**
```dockerfile
# Runs node directly, NOT through npm
CMD ["node", "dist/main.js"]

# Proper signal handling for scale-to-zero
ENTRYPOINT ["dumb-init", "--"]

# Aggressive cache cleaning
npm cache clean --force
rm -rf /root/.npm /tmp/*
```

**Security improvements:**
- Uses `dumb-init` for proper SIGTERM handling (critical for scale-to-zero)
- Runs as non-root user
- Alpine Linux base (minimal size)

### 3. Enhanced .dockerignore
Excludes:
- Test files
- Development tools
- Documentation
- Scripts folder
- Git history

### 4. Removed koyeb.yaml
Koyeb doesn't use this file - configuration is done through the control panel or CLI.

## Expected Results

**Before optimization:**
- Buildpack image: ~500MB-1GB
- Uses npm start (wrong command)
- Includes dev dependencies in runtime
- Fails on scale-to-zero restart with "Image download failure"

**After optimization:**
- Docker image: ~150-200MB
- Runs `node dist/main.js` directly
- Production dependencies only
- Proper signal handling for restarts
- Faster cold starts (5-15 seconds)

## Image Size Breakdown
- Node.js Alpine base: ~40MB
- Production node_modules: ~80-100MB
- Compiled dist/: ~5-10MB
- Media files: ~8.5MB
- **Total: ~150-180MB** ✅ (Well under 7GB limit)

## Why It Failed Before

1. **Wrong start command** - `npm start` uses NestJS CLI which needs dev deps
2. **Buildpacks include everything** - dev dependencies, source files, etc.
3. **No cache cleaning** - npm cache adds 50-100MB
4. **Poor signal handling** - Node doesn't handle SIGTERM properly without init system
5. **Image corruption** - Large images can fail to download/extract on free tier

## Deployment Steps

### 1. Commit and Push
```bash
git add .
git commit -m "fix: optimize Docker image for Koyeb scale-to-zero"
git push
```

### 2. Configure Koyeb (Important!)

In the Koyeb control panel, make sure:

**Build settings:**
- Build method: **Dockerfile**
- Dockerfile path: `Dockerfile`

**Run settings:**
- Port: **8000** (or leave default, app uses PORT env var)
- Health check: TCP (default is fine)

**Instance settings:**
- Type: **Free**
- Scaling: Min **0**, Max **1** (for scale-to-zero)

### 3. Redeploy

After pushing, trigger a new deployment in Koyeb. The first build will take 3-5 minutes.

## Monitoring

After deployment, watch for:
- ✅ Build completes successfully
- ✅ Image size shown in dashboard (~150-200MB)
- ✅ Service starts and responds to requests
- ✅ Scale-to-zero works (sleeps after 5 minutes)
- ✅ Wake-up works (restarts in 5-15 seconds)
- ✅ **No more "Image download failure" errors**

## Troubleshooting

If it still fails:
1. Check Koyeb logs for the actual error
2. Verify Dockerfile is being used (not buildpacks)
3. Ensure PORT environment variable is set
4. Check that media files are accessible
5. Contact Koyeb support with deployment ID

## Test Locally (Optional)

```bash
# Build the image
docker build -t acs-api .

# Check size
docker images acs-api

# Run locally
docker run -p 3000:8000 -e PORT=8000 acs-api

# Test
curl http://localhost:3000
```
