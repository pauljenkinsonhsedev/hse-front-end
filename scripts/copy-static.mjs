import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const src = 'src/secureroot/copy';
const dest = 'secureroot/hseonline/website/livelive/secureroot';

async function copyStatic() {
  const files = await glob(`${src}/**/*`, {
    windowsPathsNoEscape: true,
    nodir: true,
    ignore: ['**/.DS_Store']
  });

  if (files.length === 0) {
    console.log('No static files found to copy.');
    return;
  }

  let copied = 0;

  for (const file of files) {
    const normalized = file.replace(/\\/g, '/');
    const relative = path.relative(src, normalized);
    const outputPath = path.join(dest, relative);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.copyFile(normalized, outputPath);
    console.log(`  Copied: ${outputPath}`);
    copied++;
  }

  console.log(`Static copy complete (${copied} file${copied === 1 ? '' : 's'}).`);
}

copyStatic().catch(err => {
  console.error('Static copy failed:', err);
  process.exit(1);
});
