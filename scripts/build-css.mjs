import { execSync } from 'child_process';

const version = process.env.npm_package_version;
const output = `./secureroot/hseonline/website/livelive/secureroot/assets/v6-css/${version}.min.css`;

console.log(`Building CSS v${version}...`);

execSync(
  `sass ./src/secureroot/v6-css/scss/v6.scss:${output} --load-path=node_modules --style=compressed --no-source-map`,
  { stdio: 'inherit', shell: true }
);

execSync(
  `postcss ${output} --use autoprefixer --no-map -o ${output}`,
  { stdio: 'inherit', shell: true }
);

console.log('CSS build complete.');
