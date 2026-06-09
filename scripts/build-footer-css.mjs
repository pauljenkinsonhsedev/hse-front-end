// Builds a footer-scoped CSS bundle from the existing compiled v6 stylesheet
// by wrapping it in `@scope (.hse-footer-scope) { ... }`. This lets the full
// HSE stylesheet apply only inside an `.hse-footer-scope` ancestor — so it
// can be used to style the HSE footer when embedded on third-party pages
// (e.g. Citizen Space) without leaking and breaking their styling.
//
// Requires: build:css must have run first to produce the source bundle.
// Browser support for @scope (June 2026): Chrome 118+, Edge 118+,
// Safari 17.4+, Firefox 128+. Older browsers fall back to unstyled footer
// (still semantic and accessible).

import fs from 'fs/promises';
import path from 'path';

const version = process.env.npm_package_version;

const source = `./secureroot/hseonline/website/livelive/secureroot/assets/v6-css/${version}.min.css`;
const output = `./secureroot/hseonline/website/livelive/secureroot/assets/v6-css/footer-${version}.min.css`;

async function buildFooterCss() {
  console.log(`Building footer-scoped CSS v${version}...`);

  const css = await fs.readFile(source, 'utf-8');
  const scoped = `@scope (.hse-footer-scope) {${css}}\n`;

  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, scoped);
  console.log(`  Wrote: ${output}`);

  console.log('Footer CSS scoping complete.');
}

buildFooterCss().catch(err => {
  console.error('Footer CSS build failed:', err);
  process.exit(1);
});
