import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const src = 'src/secureroot/html';
const dest = 'secureroot/hseonline/website/livelive/secureroot';

// Windows locks files briefly (editor save, Browsersync read, AV scan), which
// surfaces as EBUSY/EPERM on copyFile. Retry a few times before giving up.
const LOCK_CODES = new Set(['EBUSY', 'EPERM', 'EACCES']);
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 120;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function copyWithRetry(from, to) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await fs.copyFile(from, to);
      return true;
    } catch (err) {
      if (!LOCK_CODES.has(err.code) || attempt === MAX_RETRIES) {
        if (LOCK_CODES.has(err.code)) {
          // Still locked after all retries — skip rather than crash the watcher.
          console.warn(`  Skipped (locked after ${MAX_RETRIES} tries): ${to}`);
          return false;
        }
        throw err; // genuine error (bad path, permissions on dir, etc.)
      }
      await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  return false;
}

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
    const ok = await copyWithRetry(normalized, outputPath);
    if (ok) {
      console.log(`  Copied: ${outputPath}`);
      copied++;
    }
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
