import { watch } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const srcDir = 'src/designsystem/html';
console.log(`Watching ${srcDir} for changes...`);

// Initial copy on start
execSync('node scripts/copy-ds-html.mjs', { stdio: 'inherit', shell: true });

let debounceTimer = null;

watch(srcDir, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (path.extname(filename).toLowerCase() !== '.htm') return;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`Changed: ${filename} — copying...`);
    execSync('node scripts/copy-ds-html.mjs', { stdio: 'inherit', shell: true });
  }, 300);
});
