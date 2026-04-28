import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const src = 'src/secureroot/html';
const dest = 'secureroot/hseonline/website/livelive/secureroot';
async function copyHtml() {
  const pattern = `${src}/**/*.htm`;
  const files = await glob(pattern, { windowsPathsNoEscape: true });

  if (files.length === 0) {
    console.log('No HTML files found to copy.');
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

  console.log(`HTML copy complete (${files.length} files).`);
}

copyHtml().catch(err => {
  console.error('HTML copy failed:', err);
  process.exit(1);
});
