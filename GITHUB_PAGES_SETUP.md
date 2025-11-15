# GitHub Pages Setup Instructions

## Quick Setup

This repository contains a static website companion for the research paper "Divergent Creativity in Humans and Large Language Models".

### Option 1: Using the copilot/companion-website branch

The website files are available on the `copilot/companion-website` branch and can be deployed directly:

1. Go to your repository **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Select branch: `copilot/companion-website`
4. Select folder: `/ (root)`
5. Click **Save**

Your site will be published at: `https://sangfrois.github.io/DAT_GPT/`

### Option 2: Renaming to companion-website branch (recommended)

If you prefer a branch without the `copilot/` prefix:

```bash
# Fetch the latest changes
git fetch origin

# Create a new branch called companion-website from copilot/companion-website
git checkout -b companion-website origin/copilot/companion-website

# Push to remote
git push origin companion-website

# Then configure GitHub Pages to use the companion-website branch
```

## Website Contents

The website includes:
- **index.html** - Main page with all content sections
- **styles.css** - Modern, responsive styling with purple gradient theme
- **script.js** - Interactive features (smooth scrolling, citation copy)
- **figures/** - Research visualizations

## Sections

- Abstract
- Key Findings (4 research highlights)
- Methodology (DAT, Creative Writing, DSI metrics)
- Data & Code (links to datasets and notebooks)
- Citation (BibTeX format with copy button)

## Features

✅ Fully responsive design
✅ Modern aesthetic with gradient hero section
✅ Smooth navigation and animations
✅ Direct links to arXiv paper and GitHub repository
✅ Interactive citation copying
✅ Professional academic presentation

## Customization

To modify the website:
1. Checkout the branch: `git checkout copilot/companion-website` (or `companion-website` if renamed)
2. Edit the HTML, CSS, or JS files
3. Commit and push your changes
4. GitHub Pages will automatically rebuild (may take 1-2 minutes)

## Troubleshooting

- **Site not updating**: Wait 1-2 minutes after pushing changes
- **404 error**: Ensure GitHub Pages is enabled in Settings → Pages
- **Blank page**: Check browser console for errors (F12)

## Support

For issues with the website, please open an issue on the [GitHub repository](https://github.com/sangfrois/DAT_GPT).
