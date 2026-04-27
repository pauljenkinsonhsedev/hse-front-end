import { execSync } from 'child_process';

const version = process.env.npm_package_version;
const output = `./designsystem/assets/v6-css/${version}.min.css`;

console.log(`Building design system CSS v${version}...`);

execSync(
  `sass ./src/secureroot/v6-css/scss/design-system.scss:${output} --load-path=node_modules --style=compressed --no-source-map`,
  { stdio: 'inherit' }
);

execSync(
  `postcss ${output} --use autoprefixer --no-map -o ${output}`,
  { stdio: 'inherit' }
);

console.log('Design system CSS build complete.');
