# Deployment Guide

This guide will help you deploy the Infinity Grid Duel game to free hosting services.

## Architecture

- **Backend**: Node.js/Express API (deployed to Render/Railway)
- **Frontend**: React/Vite app (deployed to Vercel/Netlify)

## Option 1: Deploy to Render (Backend) + Vercel (Frontend)

### Step 1: Deploy Backend to Render

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `https://github.com/Manisha-Manhas/infinity-grid-duel`
4. Configure the service:
   - **Name**: `infinity-grid-duel-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Add environment variable:
   - Key: `CORS_ORIGIN`
   - Value: `*` (or your frontend URL after deployment)
6. Click "Create Web Service"
7. **Copy the backend URL** (e.g., `https://infinity-grid-duel-backend.onrender.com`)

### Step 2: Update Frontend API URL

Before deploying the frontend, update the API base URL:

1. Open `frontend/src/api/gameApi.ts`
2. Replace `http://localhost:3000` with your Render backend URL
3. Commit and push:
   ```bash
   git add frontend/src/api/gameApi.ts
   git commit -m "Update API URL for production"
   git push origin main
   ```

### Step 3: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"
6. Your app will be live at `https://your-app.vercel.app`

### Step 4: Update CORS on Backend

1. Go back to Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Update `CORS_ORIGIN` to your Vercel URL (e.g., `https://your-app.vercel.app`)
5. Save changes (service will redeploy automatically)

---

## Option 2: Deploy to Railway (Backend) + Netlify (Frontend)

### Step 1: Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - Railway will auto-detect Node.js
5. Add environment variables:
   - `PORT`: 3000
   - `CORS_ORIGIN`: `*` (update later)
6. Deploy and **copy the backend URL**

### Step 2: Update Frontend API URL

Same as Option 1, Step 2

### Step 3: Deploy Frontend to Netlify

1. Go to [Netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Click "Deploy site"
6. Your app will be live at `https://your-app.netlify.app`

### Step 4: Update CORS on Backend

Update the `CORS_ORIGIN` environment variable on Railway with your Netlify URL

---

## Quick Deploy Commands

### Build Backend Locally (Test)
```bash
cd backend
npm install
npm run build
npm start
```

### Build Frontend Locally (Test)
```bash
cd frontend
npm install
npm run build
npm run preview
```

---

## Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

### Frontend
Update `frontend/src/api/gameApi.ts`:
```typescript
const API_BASE_URL = 'https://infinity-grid-duel.onrender.com';
```

---

## Troubleshooting

### CORS Errors
- Make sure `CORS_ORIGIN` on backend matches your frontend URL exactly
- Include protocol (https://) and no trailing slash

### Backend Not Starting
- Check logs in Render/Railway dashboard
- Verify build command completed successfully
- Ensure all dependencies are in `dependencies` (not `devDependencies`)

### Frontend API Errors
- Verify backend URL is correct in `gameApi.ts`
- Check backend is running and accessible
- Test backend health endpoint: `https://infinity-grid-duel.onrender.com/health`

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

---

## Post-Deployment

1. Test the game thoroughly
2. Monitor backend logs for errors
3. Set up custom domain (optional)
4. Enable HTTPS (usually automatic)
5. Monitor usage and performance

---

## Free Tier Limits

**Render Free Tier:**
- Spins down after 15 minutes of inactivity
- First request may be slow (cold start)
- 750 hours/month

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**Railway Free Tier:**
- $5 credit/month
- No credit card required initially

**Netlify Free Tier:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS

---

## Need Help?

- Check service status pages
- Review deployment logs
- Test locally first
- Verify environment variables
