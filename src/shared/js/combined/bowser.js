import load from './utils/asset-loader';
import pathEnv from './utils/asset-env-path';


export function bowser() {

    return Promise.all([
        load.js(pathEnv + "/assets/v6-js/vendor/bowser/es5.js"),
    ])
    .catch((err) => {
        console.error(`Error initiating bowser: ${err}`);
    });

}