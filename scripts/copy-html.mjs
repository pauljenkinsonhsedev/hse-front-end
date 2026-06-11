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
    console.log(`  Copied: ${outputPath}`);
    copied++;
  }

  if (copied === 0) {
    console.log('HTML copy complete (no changes).');
  } else {
    console.log(`HTML copy complete (${copied} file${copied === 1 ? '' : 's'}).`);
  }
}

copyHtml().catch(err => {
  console.error('HTML copy failed:', err);
  process.exit(1);
});
