import sharp from 'sharp';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

// Define the directory containing images
const WORK_DIR = path.join(process.cwd(), 'public', 'assets', 'work');

console.log(`Starting image optimization in ${WORK_DIR}...`);

// Find all PNG and JPG images in the work directory
glob(`${WORK_DIR}/**/*.{png,jpg,jpeg}`, async (err, files) => {
  if (err) {
    console.error('Error finding files:', err);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${files.length} images. Optimizing...`);

  let optimizedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const isOptimized = file.includes('.opt.');
    if (isOptimized) {
      skippedCount++;
      continue;
    }

    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const dirname = path.dirname(file);
    const optimizedPath = path.join(dirname, `${basename}.opt.webp`);

    try {
      // Check if optimized version already exists
      if (fs.existsSync(optimizedPath)) {
        skippedCount++;
        continue;
      }

      console.log(`Optimizing: ${path.basename(file)} -> ${path.basename(optimizedPath)}`);
      
      // Optimize image: resize if too large, convert to webp, and compress
      await sharp(file)
        .resize({ width: 1600, withoutEnlargement: true }) // Max width 1600px
        .webp({ quality: 80 }) // Convert to WebP with 80% quality
        .toFile(optimizedPath);
        
      optimizedCount++;
    } catch (error) {
      console.error(`Failed to optimize ${file}:`, error);
    }
  }

  console.log('\n--- Optimization Complete ---');
  console.log(`Successfully optimized: ${optimizedCount} images`);
  console.log(`Skipped (already optimized): ${skippedCount} images`);
  console.log('Note: Remember to update portfolio.json to use the new .opt.webp extensions!');
});
