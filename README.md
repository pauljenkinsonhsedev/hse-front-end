# HSE.GOV.UK Front-end

Source and build tooling for the HSE.GOV.UK website front-end (version 6.x).

## Requirements and getting started

### Pre-requisites

You must have installed:

- [Node.js](https://nodejs.org/en/) — version **20–22** (see `engines` in
  `package.json`; `.nvmrc` pins **22**). npm ships with Node.

> The toolchain was modernised away from the previous Gulp + Yarn setup. The
> build now uses **npm scripts** driving **Rollup** (JavaScript), **Sass** +
> **PostCSS** (CSS) and **sharp** (images). Yarn and Gulp are no longer used.

### Installation

```
npm install
```

## Running tasks

Build and watch are run via npm scripts (see `scripts` in `package.json`). The
main ones:

- **`npm run dev`** — build everything, then watch sources and serve the HSE
  website locally (browser-sync, port 8080).
- **`npm run ds`** — build and serve the **design system** locally.
- **`npm run prod`** — full production build (`build:modern`): images, assets,
  static files, HTML, CSS, footer CSS, design system and JS.

Useful individual steps:

- `npm run build:js` / `npm run watch:js` — Rollup build / watch.
- `npm run build:css` — Sass build for the website.
- `npm run build:ds` — build the design system.
- `npm run powerwash` — remove `node_modules` and built asset folders, then
  reinstall (clean slate).

## Source files

Source lives under `src/`, split into three areas:

```
src/
├── secureroot/   HSE website source (SCSS, images, HTML, Dreamweaver templates)
├── designsystem/ Design system / pattern library source (components & patterns)
└── shared/       Shared JavaScript (and vendor) used by both
```

### Secure root (`src/secureroot/`)

The HSE website assets and page tests.

```
src/secureroot/
├── html/        Page tests / content (must include a top-level index page)
├── templates/   Adobe Dreamweaver templates (.dwt) used to author pages
├── v6-css/      Website SCSS (see Styles below)
├── v6-images/   Website images
└── copy/        Static files copied verbatim into the build
```

### Design system (`src/designsystem/`)

The HSE development guide — a resource for unit testing, web-based tools and
showcasing components and patterns. Built and served via `npm run ds`.

### Shared (`src/shared/`)

JavaScript shared across the site. This is the home of all current JS.

## JavaScript (ES modules)

JavaScript is written as ES modules and bundled by **Rollup**
(`rollup.config.mjs`), transpiled with **Babel** (targets from `.browserslistrc`)
and minified with **Terser**.

```
src/shared/js/
├── main.js              Main entry → built to assets/v6-js/main-<version>.min.js (ES module)
├── cookies.js           Cookie entry → built to assets/v6-js/cookies-<version>.js (IIFE)
├── combined/            Feature modules (accordion, tabs, feedback, cookies, charts, …)
│   └── utils/           Reusable helpers (asset loader, smooth scroll, media query, …)
└── vendor/              Third-party scripts
```

Output filenames are versioned from the `version` field in `package.json`
(e.g. `main-6.7.0.min.js`). The HTML/Dreamweaver templates reference these
versioned filenames, so bump `version` and rebuild when releasing.

### JavaScript utilities

Reuse common code where possible. Shared helpers live in
`src/shared/js/combined/utils/` — for example `asset-loader.js`, which injects
`<script>` / `<link>` tags into the DOM.

#### Example: using the asset loader in a component

```js
import load from '../utils/asset-loader';

export default function YourComponent() {
  Promise.all([
    load.js('./js/vendor/your-fave-library.js'),
    load.css('./css/vendor/your-fave-library.css'),
  ])
    .then(() => {
      // do some cool stuff
    })
    .catch((err) => {
      console.error(`something went wrong ${err}`);
    });
}
```

## Styles

Website styles are authored in **SCSS** and compiled with **Sass**, then
processed by **PostCSS** (autoprefixer, postcss-pxtorem, cssnano).

```
src/secureroot/v6-css/scss/
├── v6.scss              Main website stylesheet → assets/v6-css/<version>.min.css
├── press.scss           Press/news theme styles
├── design-system.scss   Design system styles
├── base/                Base styles
└── components/          Component styles
```

SCSS is linted with **stylelint** (see `.stylelintrc.json`).
