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
- default - `yarn run gulp`
- development - `yarn run gulp-dev`
- production - `yarn run gulp-prod`

Yarn specifies the environment which is needed for each task.

## Source files
There are two main areas for source files.
### Secure Root
For all the HSE website assets (outputs: secureroot)
### Digital Workspace
The HSE Digital Workspace is a resource for web based tools and to showcase components, helpful for unit testing (outputs: workspace)

Additionally there is a 'shared' directory which currently is being used for phasing in new javascript

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
