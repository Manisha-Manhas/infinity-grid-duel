# Deploy to Netlify - Quick Guide

This guide will help you deploy the Infinity Grid Duel game using Netlify for both frontend and backend.

## Architecture
- **Backend**: Node.js API (Render or Railway)
- **Frontend**: React app (Netlify)

---

## Step-by-Step Deployment

### Step 1: Deploy Backend to Render (Free)

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Manisha-Manhas/infinity-grid-duel`
   - Click "Connect"

3. **Configure Service**
   - **Name**: `infinity-grid-duel-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variable**
   - Click "Advanced" → "Add Environment Variable"
   - Key: `CORS_ORIGIN`
   - Value: `*` (we'll update this later)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - **Copy your backend URL** (e.g., `https://infinity-grid-duel-backend.onrender.com`)

---

### Step 2: Update Frontend Configuration

Update the frontend to use your backend URL:

1. **Edit `frontend/.env.production`**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   Replace with your actual Render backend URL

2. **Commit and Push**
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push origin main
   ```

---

### Step 3: Deploy Frontend to Netlify

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your repositories
   - Select `Manisha-Manhas/infinity-grid-duel`

3. **Configure Build Settings**
   Netlify should auto-detect settings from `netlify.toml`, but verify:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Environment variables**: 
     - Key: `VITE_API_URL`
     - Value: Your Render backend URL

4. **Deploy**
   - Click "Deploy site"
   - Wait for build (1-2 minutes)
   - Your site will be live at `https://random-name.netlify.app`

5. **Optional: Custom Domain**
   - Click "Domain settings"
   - Click "Options" → "Edit site name"
   - Change to something like `infinity-grid-duel`
   - Your site will be at `https://infinity-grid-duel.netlify.app`

---

### Step 4: Update Backend CORS

Now that your frontend is deployed, update the backend CORS:

1. Go back to **Render Dashboard**
2. Select your backend service
3. Go to **Environment** tab
4. Update `CORS_ORIGIN`:
   - Value: `https://your-app.netlify.app` (your actual Netlify URL)
5. Click "Save Changes"
6. Service will automatically redeploy

---

## Testing Your Deployment

1. **Test Backend Health**
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should see: `{"status":"ok","message":"Infinity Grid Duel API is running"}`

2. **Test Frontend**
   - Visit your Netlify URL
   - Click "Start New Game"
   - Try playing against AI
   - Check browser console for errors

---

## Troubleshooting

### CORS Errors
**Problem**: "Access to fetch has been blocked by CORS policy"

**Solution**:
- Verify `CORS_ORIGIN` on Render matches your Netlify URL exactly
- Include `https://` and no trailing slash
- Example: `https://infinity-grid-duel.netlify.app`

### Backend Cold Start
**Problem**: First request takes 30+ seconds

**Solution**:
- This is normal on Render free tier
- Backend spins down after 15 minutes of inactivity
- First request wakes it up (slow)
- Subsequent requests are fast

### API Connection Failed
**Problem**: Frontend can't connect to backend

**Solution**:
1. Check `VITE_API_URL` in Netlify environment variables
2. Verify backend is running on Render
3. Test backend health endpoint directly
4. Check browser console for exact error

### Build Failures on Netlify
**Problem**: Build fails with dependency errors

**Solution**:
1. Check Node version (should be 18+)
2. Clear cache: Site settings → Build & deploy → Clear cache
3. Trigger new deploy
4. Check build logs for specific errors

---

## Environment Variables Summary

### Render (Backend)
```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://your-app.netlify.app
```

### Netlify (Frontend)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Continuous Deployment

Both Render and Netlify support automatic deployments:

- **Push to GitHub** → Automatically deploys to both services
- **Backend**: Render rebuilds and redeploys
- **Frontend**: Netlify rebuilds and redeploys

To disable auto-deploy:
- **Render**: Settings → Auto-Deploy → Disable
- **Netlify**: Site settings → Build & deploy → Stop builds

---

## Monitoring & Logs

### Render Logs
- Dashboard → Your service → Logs tab
- View real-time backend logs
- Check for errors and requests

### Netlify Logs
- Site overview → Deploys tab
- Click on a deploy to see build logs
- Check for build errors

---

## Free Tier Limits

### Render Free Tier
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic HTTPS
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start: 30+ seconds

### Netlify Free Tier
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Automatic HTTPS
- ✅ Instant cache invalidation
- ✅ No cold starts

---

## Next Steps

1. ✅ Test all game features
2. ✅ Monitor backend logs for errors
3. ✅ Share your game URL!
4. 🎯 Optional: Set up custom domain
5. 🎯 Optional: Add analytics
6. 🎯 Optional: Set up monitoring alerts

---

## Your Deployed URLs

After deployment, save these:

- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-backend.onrender.com`
- **Backend Health**: `https://your-backend.onrender.com/health`

---

## Need Help?

- Check [Netlify Docs](https://docs.netlify.com)
- Check [Render Docs](https://render.com/docs)
- Review build logs for errors
- Test locally first: `npm run build && npm run preview`

---

## Success! 🎉

Your game is now live and accessible to anyone with the URL!

Share it with friends and enjoy playing Infinity Grid Duel online!
