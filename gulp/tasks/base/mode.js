const mode = require('gulp-mode')({
    modes: ['production', 'development', 'staging', 'default'],
    default: 'default',
    verbose: false
});

export let root;
export const isDefault = mode.default();
export const isDev = mode.development();
export const isProd = mode.production();

if (isDefault) {
    root = 'secureroot';
}

if (isDev) {
    root = 'workspace';
}

if (isProd) {
}
