import { spawn } from 'child_process';

const version = process.env.npm_package_version;
const output = `./secureroot/hseonline/website/livelive/secureroot/assets/v6-css/${version}.min.css`;

console.log(`Watching CSS v${version}...`);

const proc = spawn(
  'sass',
  [
    '--watch',
    '--poll',
    `./src/secureroot/v6-css/scss/v6.scss:${output}`,
    '--load-path=node_modules',
    '--style=compressed',
    '--no-source-map'
  ],
  { stdio: 'inherit', shell: true }
);

proc.on('exit', (code) => process.exit(code));
