# HSE.GOV.UK Front-end

## Requirements and getting started
### Pre-requisites
You must install globally
- [NodeJs](https://nodejs.org/en/) JavaScript framework
- [Yarn](https://yarnpkg.com/getting-started/install) package manager

### Installation
- Install NodeJs and Yarn as above
- Run `yarn install`

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
└──workspace/
```
### Secure Root
For all the HSE website assets and page testing.

Page tests can be hosted in the html dir:
```
src/
└──secureroot/
    └──html/
```
### Digital Workspace
The HSE Digital Workspace is a resource for unit testing, web based tools and to showcase components.

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

### HSE Digital workspace
Follows the atomic design pattern
```
src/
workspace/
    └──styles/
    └───────atoms/
    └───────foundations/
    └───────molecules/
    └───────organisms/
    └───────settings/
    └──app.css
```

## Javascript es6
All new javascript should be written in the `src/shared/js/combined` directory and is written as es6 standard.

```
src/
└──shared/
    └──js/
    └───────combined/
    └───────classes/
    └───────utils/
    └──app.js
```
### Loader utility
Injects script and link tags into the head or body of the DOM.

```
src/
└──shared/
    └──js/
    └───────utils/
    └───────────────asset-loader.js
```
#### Usage

```
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
```