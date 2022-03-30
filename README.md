# HSE.GOV.UK Front-end

## Release notes

5.6.9
- Change releases to semantic versioning and synchronise with DW template version
- Document landing page standards updated in design system
- Gitflow documentation added to design system 



## Requirements and getting started
### Pre-requisites
You must install globally
- [NodeJs](https://nodejs.org/en/) JavaScript framework
- [Yarn](https://yarnpkg.com/getting-started/install) package manager

### Node version
Last run with NodeJs v14.18.1 and yarn v1.22.17

### Installation
- Install NodeJs and Yarn as above
- Run `yarn install` if using yarn or `npm install`

## Running tasks
There are only three tasks you need to know:
- default - `yarn run gulp-hse` (Opens local HSE website)
- development - `yarn run gulp-dev` (Opens local Digial Workspace)
- production - `yarn run gulp-prod` (Minifies and zips contents)

Yarn specifies the environment which is needed for each task.

## Source files
There are two main areas for source files:
```
src/
└──secureroot/
└──devguide/
```
### Secure Root
For all the HSE website assets and page testing.

For the task to run we must first add some pages to the html folder. Make sure this includes a top level index page. 

Page tests can be hosted in the html dir:
```
src/
└──secureroot/
    └──html/
```
### Devguide
The HSE development guide is a resource for unit testing, web based tools and to showcase components.
```
src/
└──devguide/
```

Additionally there is a 'shared' directory which currently is being used for phasing in new javascript.
```
src/
└──shared/
    └──js/
```
## Styles
### HSE website
```
src/
└──secureroot/
    └──v5-css/
    └───────scss/
    └──v5.css
```

## Javascript es6
Javascript is written as standard in es6 and lives in the `src/shared/js/combined` directory.

```
src/
└──shared/
    └──js/
    └───────combined/
    └─────────classes/
    └─────────utils/
    └──v5-cookies.js
    └──v5-main.js

```
## Javascript utilities
It is good practice to reuse code as much as possible. For some of the more common features we can place them in the utilities folder for example loading assets such as third party scripts.
### Asset loader
Injects script and link tags into the head or body of the DOM.

```
src/
└──shared/
    └──js/
    └───────utils/
    └───────────────asset-loader.js
```
#### Example of how to use this in your component

```
import load from '../utils/asset-loader';

...

export default YOURCOMPONENT() {

    Promise.all([
        load.js('./js/vendor/your-fave-library.js'),
        load.css('./css/vendor/your-fave-library.css')
    ])
    .then(() => {
        // do some cool stuff
    })
    .catch((err) => {
        console.error(`something went wrong ${err}`)
    });

    ...
```