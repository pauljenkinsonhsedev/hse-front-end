import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const src = 'src/secureroot/v6-images';
const dest = 'secureroot/hseonline/website/livelive/secureroot/assets/v6-images';

async function copyImages() {
  const files = await glob(`${src}/**/*.{jpg,jpeg,png,svg}`, { windowsPathsNoEscape: true });

  if (files.length === 0) {
    console.log('No image files found to copy.');
    return;
  }

  for (const file of files) {
    const normalized = file.replace(/\\/g, '/');
    const relative = path.relative(src, normalized);
    const outputPath = path.join(dest, relative);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.copyFile(normalized, outputPath);
    console.log(`  Copied: ${outputPath}`);
  }

  console.log(`Image copy complete (${files.length} files).`);
}

copyImages().catch(err => {
  console.error('Image copy failed:', err);
  process.exit(1);
});
