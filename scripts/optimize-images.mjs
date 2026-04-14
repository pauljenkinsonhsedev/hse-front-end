import { glob } from 'glob';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

// Updated paths to match your folder structure exactly
const paths = [
  { src: 'src/designsystem/images', dest: 'designsystem/images' },];

async function runOptimization() {
  console.log('🚀 Starting image optimization...');

  // Use forward slashes for glob as per documentation
  const images = await glob('src/**/images/**/*.{jpg,jpeg,png,webp,gif,avif}');

  if (images.length === 0) {
    console.log('⚠ No images found in src directories.');
    return;
  }

  for (const file of images) {
    // Standardize path for mapping check
    const normalizedFile = file.replace(/\\/g, '/');
    const mapping = paths.find(p => normalizedFile.includes(p.src));

    if (!mapping) continue;

    // Build the output path
    const relativeDir = path.dirname(normalizedFile).split('images')[1] || '';
    const outputDir = path.join(mapping.dest, relativeDir);
    const outputPath = path.join(outputDir, path.basename(normalizedFile));

    // Ensure directory exists and process
    await fs.mkdir(outputDir, { recursive: true });
    
    try {
      await sharp(normalizedFile).toFile(outputPath);
      console.log(`  ✔ Optimized: ${outputPath}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${normalizedFile}`, err.message);
    }
  }

  console.log('✨ Image build complete!');
}

// Execute
runOptimization().catch((err) => {
  console.error('❌ Script Error:', err);
  process.exit(1);
});