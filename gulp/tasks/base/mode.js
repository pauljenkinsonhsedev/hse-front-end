const mode = require('gulp-mode')({
    modes: ['production', 'development', 'staging', 'default'],
    default: 'default',
    verbose: false
});

export let root;
export const isDefault = mode.default();
export const isStaging = mode.staging();
export const isDev = mode.development();
export const isProd = mode.production();

if (isDefault || isStaging) {
    console.log('hse');
    root = 'secureroot';
}

if (isDev) {
    console.log('workspace');
    root = 'workspace';
}

if (isProd) {
}
