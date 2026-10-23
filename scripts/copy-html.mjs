import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const src = 'src/secureroot/html';
const dest = 'secureroot/hseonline/website/livelive/secureroot';

// src/secureroot/html is git-ignored, so a fresh clone has no pages. Serve the
// tracked starter page as index.htm until the developer adds their own.
const starter = 'src/secureroot/starter/index.htm';
const STARTER_MARKER = 'hse-starter-page';
const destIndex = path.join(dest, 'index.htm');

async function isStarterPage(file) {
  const content = await fs.readFile(file, 'utf8').catch(() => '');
  return content.includes(STARTER_MARKER);
}

async function copyStarter() {
  const { version } = JSON.parse(await fs.readFile('package.json', 'utf8'));
  const content = (await fs.readFile(starter, 'utf8')).replaceAll('{{version}}', version);
  const existing = await fs.readFile(destIndex, 'utf8').catch(() => null);

  if (existing === content) return;
  // Never overwrite a real index.htm already in the build output.
  if (existing !== null && !existing.includes(STARTER_MARKER)) return;

  await fs.mkdir(dest, { recursive: true });
  await fs.writeFile(destIndex, content);
  console.log(`  Copied starter page: ${destIndex}`);
}

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
  await fs.mkdir(src, { recursive: true });

  const pattern = `${src}/**/*.{htm,json}`;
  const files = await glob(pattern, { windowsPathsNoEscape: true });
  const hasIndex = files.some(file => path.relative(src, file) === 'index.htm');

  if (!hasIndex) await copyStarter();

  if (files.length === 0) {
    console.log(`No HTML files found to copy. Add pages to ${src}.`);
    return;
  }

  let copied = 0;

  for (const file of files) {
    const normalized = file.replace(/\\/g, '/');
    const relative = path.relative(src, normalized);
    const outputPath = path.join(dest, relative);

    const srcStat = await fs.stat(normalized);
    const destStat = await fs.stat(outputPath).catch(() => null);

    // A real index.htm always replaces the starter, even if its mtime is older.
    const replacesStarter = outputPath === destIndex && (await isStarterPage(outputPath));
    if (destStat && srcStat.mtimeMs <= destStat.mtimeMs && !replacesStarter) continue;

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
