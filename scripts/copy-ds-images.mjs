import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const src = 'src/secureroot/v6-images';
const dest = 'designsystem/assets/v6-images';

async function copyImages() {
  const files = await glob(`${src}/**/*.{jpg,jpeg,png,svg}`, { windowsPathsNoEscape: true });

  if (files.length === 0) {
    console.log('No image files found to copy.');
    return;
  }

  let copied = 0;

  for (const file of files) {
    const normalized = file.replace(/\\/g, '/');
    const relative = path.relative(src, normalized);
    const outputPath = path.join(dest, relative);

    const srcStat = await fs.stat(normalized);
    const destStat = await fs.stat(outputPath).catch(() => null);

    if (destStat && srcStat.mtimeMs <= destStat.mtimeMs) continue;

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.copyFile(normalized, outputPath);
    copied++;
  }

  console.log(`Design system image copy complete (${copied} file${copied === 1 ? '' : 's'}).`);
}

copyImages().catch(err => {
  console.error('Design system image copy failed:', err);
  process.exit(1);
});
