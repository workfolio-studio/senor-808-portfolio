# Website Administration Guide

This guide explains how you can easily manage and update your portfolio without writing any code, directly through the GitHub web interface.

## Adding New Artwork Images

The Work grid is reserved for visual artwork. Podcast/audio/media proof should be added only through a separate Media workflow after links or files are publish-ready and permissioned.

1. Navigate to the `/public/assets/work/` directory in this GitHub repository.
2. Click the **Add file** button in the top right corner and select **Upload files**.
3. Drag and drop your new images into the browser window.
   * *Tip:* Optimize images for web (e.g., under 1MB) and name them clearly without spaces (e.g., `new-artwork-2026.png`).
4. Click **Commit changes** to save them to the repository.

## Updating the Portfolio Grid

To add a new piece to the website's gallery, you need to update the data file.

1. Navigate to `/src/data/portfolio.json`.
2. Click the **pencil icon (Edit this file)** in the top right.
3. You will see a list of your artworks inside brackets `[ ... ]`. Each artwork is surrounded by curly braces `{ ... }`.
4. Copy an existing artwork block and paste it below or above another one. Make sure there is a comma `,` separating each block.
5. Update the values:
   - `"id"`: Give it a new unique number.
   - `"title"`: The name of the piece.
   - `"img"`: The path to the image you just uploaded (e.g., `"/assets/work/new-artwork-2026.png"`).
   - `"cat"`: The category (e.g., `"MIXED MEDIA"`, `"ACRYLIC"`). This must match one of your categories exactly to work with the filters.
   - `"year"`: The year of the piece.
   - `"wide"`: Set to `true` if you want this piece to take up two columns in the grid, or remove it for a standard square card.
6. Once you're done, scroll down and click **Commit changes**.

## Automated Image Optimization

To ensure the site loads quickly and performs well on GitHub Pages, we've included an image optimization script that resizes large images and converts them to the lightweight WebP format.

**If you have Node.js installed locally:**
1. Open your terminal in the project folder.
2. Run `node scripts/optimize-images.js`.
3. The script will find all new `.jpg` or `.png` images in your `public/assets/work/` folder, shrink them to a maximum width of 1600px, and output `.opt.webp` versions.
4. Go back to your `portfolio.json` file and make sure the `"img"` paths point to the newly created `.opt.webp` files.

*When you commit changes to the `main` branch, the GitHub Action we set up (`deploy.yml`) will automatically rebuild and deploy your updated website within a few minutes.*
