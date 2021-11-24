import 'core-js/stable';
import 'core-js/features/object';
import 'regenerator-runtime/runtime';
import 'formdata-polyfill';

// IE11 polyfill
(function(undefined) {}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
