import { watch } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

const srcDir = 'src/secureroot/copy/assets/ajax';
const dest = 'secureroot/hseonline/website/livelive/secureroot/assets/ajax';

console.log(`Watching ${srcDir} for changes...`);

// Initial full copy on start
execSync('node scripts/copy-ajax.mjs', { stdio: 'inherit', shell: true });

let debounceTimer = null;
let pendingFile = null;

watch(srcDir, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (path.basename(filename) === '.DS_Store') return;

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
