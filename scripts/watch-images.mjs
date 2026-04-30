import { watch } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

const srcDir = 'src/secureroot/v6-images';
const dest = 'secureroot/hseonline/website/livelive/secureroot/assets/v6-images';
const extensions = ['.jpg', '.jpeg', '.png', '.svg'];

console.log(`Watching ${srcDir} for changes...`);

// Initial full copy on start
execSync('node scripts/copy-images.mjs', { stdio: 'inherit', shell: true });

let debounceTimer = null;
let pendingFile = null;

watch(srcDir, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (!extensions.includes(path.extname(filename).toLowerCase())) return;

  pendingFile = filename;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    const srcFile = path.join(srcDir, pendingFile);
    const destFile = path.join(dest, pendingFile);

    try {
      await fs.mkdir(path.dirname(destFile), { recursive: true });
      await fs.copyFile(srcFile, destFile);
      console.log(`  Copied: ${destFile}`);
    } catch (err) {
      if (err.code !== 'ENOENT') console.error(`  Failed: ${err.message}`);
    }
  }, 300);
});
