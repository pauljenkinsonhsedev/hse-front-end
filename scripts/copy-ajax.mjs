import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const src = 'src/secureroot/copy/assets/ajax';
const dest = 'secureroot/hseonline/website/livelive/secureroot/assets/ajax';

async function copyAjax() {
  const files = await glob(`${src}/**/*`, {
    windowsPathsNoEscape: true,
    nodir: true,
    ignore: ['**/.DS_Store']
  });

  if (files.length === 0) {
    console.log('No ajax files found to copy.');
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

  console.log(`Ajax copy complete (${files.length} file${files.length === 1 ? '' : 's'}).`);
}

copyAjax().catch(err => {
  console.error('Ajax copy failed:', err);
  process.exit(1);
});
