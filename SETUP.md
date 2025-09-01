# Setup Instructions for ReelFlow Landing Pages

## Initial Setup Steps

### 1. Connect to GitHub
1. Create a new repository on GitHub (e.g., `reelflow-landing-pages`)
2. Push this code to the repository
3. Enable GitHub Actions (should be enabled by default)

### 2. Configure GitHub Pages
1. Go to your repo's **Settings** → **Pages**
2. Under "Source", select **"Deploy from a branch"**
3. Choose **`gh-pages`** branch (will be created after first build)
4. Click **Save**

### 3. Set Up Custom Domain (Optional)
For `share.reelflow.com`:

**DNS Configuration:**
```
Type: CNAME
Name: share
Value: [your-github-username].github.io
```

**GitHub Pages Custom Domain:**
1. Go to **Settings** → **Pages** → **Custom domain**
2. Enter: `share.reelflow.com`
3. Check **"Enforce HTTPS"**

### 4. Add Your Brand Assets

Replace these placeholder files with your actual ReelFlow assets:

```
assets/
├── css/
│   └── main.css                 # Update colors, fonts, spacing
├── images/
│   ├── reelflow-logo.svg        # Main logo for header
│   ├── reelflow-logo-light.svg  # Light logo for footer
│   └── favicon.ico              # Site favicon
```

**Key brand elements to update in CSS:**
- Primary colors (buttons, accents)
- Typography (font families, weights)
- Spacing and border radius
- Gradient colors for hero section
- Button styles (pill shape, hover effects)

### 5. Test Your First Build

1. **Update CSV**: Edit `data/landingpages.csv` with real content
2. **Manual Build**: 
   - Go to **Actions** → **"Build Landing Pages"**
   - Click **"Run workflow"** → **"Run workflow"**
3. **Check Output**: After build completes, visit your GitHub Pages URL

### 6. Production Workflow

**For each new landing page:**

1. **Add row to CSV** with new company data
2. **Commit changes** to main branch  
3. **Run build workflow** in GitHub Actions
4. **Page goes live** at `share.reelflow.com/[company-slug]/`

## Troubleshooting

### Build Fails
- Check CSV formatting (proper quotes, commas)
- Ensure all required columns are present
- View build logs in GitHub Actions for details

### Pages Not Loading
- Verify GitHub Pages is enabled and set to `gh-pages` branch
- Check that workflow completed successfully
- DNS propagation can take 24-48 hours for custom domains

### Styling Issues
- Brand assets not loading: Check file paths in template
- Colors wrong: Update CSS custom properties in `main.css`
- Layout broken: Verify template HTML structure

## Next Steps

1. **Connect analytics** (Google Analytics, Mixpanel, etc.)
2. **Add more CSV columns** for additional customization
3. **Create multiple templates** for different page types
4. **Set up automated testing** for generated pages

---

**Need help?** Check the main README.md or contact the development team.