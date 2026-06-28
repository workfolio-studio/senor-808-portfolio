# Señor 808 Website Administration Guide

Version 1.0
Prepared By: Brian Curr
Date: June 2026

---

# 1.0 Website Overview

This website is a static portfolio website built with:

* React
* Vite
* TypeScript
* GitHub Pages
* GitHub Actions

The website automatically rebuilds and republishes itself whenever approved changes are saved to the repository.

Current Production URL:

https://brianjcurr.github.io/senor-808-portfolio/

This URL is temporary and may later be replaced with a custom domain.

---

# 2.0 Website Architecture

Website Code
↓
GitHub Repository
↓
GitHub Actions
↓
GitHub Pages
↓
Public Website

---

# 3.0 Important Folders

## Artwork Images

public/assets/work/

Contains:

* portfolio artwork
* project thumbnails
* gallery images

---

## Hero Images

public/assets/hero/

Contains:

* homepage hero images
* media section imagery

---

## Portfolio Data

src/data/portfolio.json

Contains:

* artwork titles
* descriptions
* categories
* image file names
* alt text

---

# 4.0 Adding New Artwork

## Step 1

Prepare your image.

Recommended:

* JPG or PNG
* Width: 1800–2400 pixels
* Under 1 MB file size when possible

Use descriptive filenames.

Example:

sunset-series-01.jpg

---

## Step 2

Upload the image into:

public/assets/work/

---

## Step 3

Open:

src/data/portfolio.json

Duplicate an existing artwork record and update:

* title
* category
* description
* image filename
* alt text

---

## Step 4

Save and commit the changes.

GitHub Actions will automatically rebuild and republish the website.

No additional deployment work is required.

---

# 5.0 Updating Text Content

Most website text can be updated inside:

src/App.tsx

Examples:

* About section
* Media section
* Contact language
* Footer language

---

# 6.0 Viewing Website Deployments

Navigate to:

Repository
→ Actions

Green check mark:
Deployment succeeded.

Red X:
Deployment failed.

Click the workflow to view details.

---

# 7.0 Troubleshooting

## Images Missing

Verify:

* filename spelling
* image location
* portfolio.json entry

---

## Website Not Updating

Check:

Actions
→ latest workflow run

---

## Broken Layout

Most issues are caused by:

* accidental file deletion
* incorrect image path
* incorrect JSON formatting

---

# 8.0 Repository Ownership

Current Owner:

Brian Curr

Future State:

Transfer repository ownership to Bob Garcia.

---

# 9.0 Future Custom Domain

Recommended domains:

[www.senor808.com](http://www.senor808.com)

or

senor808.com

After connecting a custom domain, fans will no longer see the GitHub URL.

---

# 10.0 Support

If questions arise, contact:

Brian Curr

for future maintenance, training, or enhancements.
