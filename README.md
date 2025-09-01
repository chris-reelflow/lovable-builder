# ReelFlow Landing Pages Generator

A CSV-driven static landing page generator for ReelFlow's customer-specific marketing pages.

## 🚀 Quick Start

1. **Add your content to CSV**:
   - Edit `data/landingpages.csv` with your landing page content
   - Each row creates a new landing page at `share.reelflow.com/[company-slug]/`

2. **Build pages manually**:
   - Go to GitHub Actions → "Build Landing Pages" workflow
   - Click "Run workflow" to generate and deploy pages

3. **Add your brand assets**:
   - Replace files in `/assets/` with your ReelFlow brand assets
   - Update `/assets/css/main.css` with your brand colors and styles

## 📁 Project Structure

```
├── data/
│   └── landingpages.csv          # Content source (edit this!)
├── templates/
│   └── landing-page.html         # HTML template
├── assets/
│   ├── css/main.css             # Styles (customize for brand)
│   └── images/                  # Brand assets (add your logos)
├── scripts/
│   └── generate-pages.js        # Page generator
├── output/                      # Generated pages (auto-created)
└── .github/workflows/
    └── build-pages.yml          # Auto-deployment
```

## 🎯 CSV Structure

Your `landingpages.csv` should include these columns:

| Column | Description | Example |
|--------|-------------|---------|
| `company_name` | Company name for URL slug | "Acme Corp" |
| `page_title` | HTML page title | "ReelFlow Landing Page for Acme Corp" |
| `hero_headline` | Main headline | "Interactive, short-form video for B2B websites" |
| `hero_subheadline` | Subheadline text | "Turn your #1 marketing asset into..." |
| `primary_cta_url` | Main CTA link | "https://reelflow.com/demo" |
| `primary_cta_label` | Main CTA text | "See ReelFlow in action" |
| `screenshot_url` | Hero image | "/assets/images/acme-site.png" |

Full CSV structure includes benefit sections, company-specific content, and more.

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Generate pages locally
npm run build

# Clean output directory
npm run clean
```

## 🚀 Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch
   - Save settings

2. **Manual Build Process**:
   - Update your CSV file
   - Go to Actions → "Build Landing Pages"
   - Click "Run workflow"
   - Pages will be live at `https://[username].github.io/[repo-name]/`

### Custom Domain Setup

For `share.reelflow.com`:

1. **Add CNAME record** in your DNS:
   ```
   share.reelflow.com → [username].github.io
   ```

2. **Add custom domain** in GitHub Pages settings:
   - Go to Settings → Pages → Custom domain
   - Enter: `share.reelflow.com`
   - Save and wait for DNS verification

## 🎨 Brand Customization

### 1. Update CSS Variables

Edit `/assets/css/main.css` and update the CSS custom properties:

```css
:root {
  /* Update these with your ReelFlow brand colors */
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
  --font-primary: 'YourFont', sans-serif;
  /* ... */
}
```

### 2. Add Brand Assets

Replace placeholder files in `/assets/images/`:
- `reelflow-logo.svg` - Main logo
- `reelflow-logo-light.svg` - Light version for footer  
- `favicon.ico` - Site favicon

### 3. Update Template (Optional)

Modify `/templates/landing-page.html` for:
- Different layout structures
- Additional content sections
- Custom components

## 🔧 Advanced Configuration

### Adding New CSV Columns

1. **Add column** to your CSV file
2. **Use in template** with `{{column_name}}` syntax
3. **Rebuild pages** via GitHub Actions

### URL Structure

Pages are automatically generated at:
- CSV: `company_name: "Acme Corp"`  
- URL: `share.reelflow.com/acme-corp/`

### Custom Scripts

The generator automatically:
- ✅ Slugifies company names for URLs
- ✅ Generates SEO-friendly HTML
- ✅ Creates proper Open Graph tags
- ✅ Handles missing CSV fields gracefully

## 📊 Analytics & Tracking

Add your analytics code to the template:

```html
<!-- In landing-page.html -->
<script>
  // Google Analytics, Mixpanel, etc.
</script>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Test locally with `npm run build`
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details.

---

**Questions?** Contact the ReelFlow development team.