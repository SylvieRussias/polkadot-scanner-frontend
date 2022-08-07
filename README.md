# Introduction

This is a web app that scans and displays events for the Polkadot Network.

# About features

-   This app is inspired by this [Polkadot Event Scanner](https://polkadot.js.org/apps/#/explorer)

-   Last block is not updated after it has been loaded once,
    because it could be unituitive to see it change in the form

-   Form is hidden until the last block is fetched, so that users don't start looking for what to put as a last block
    before the field gets automatically filled

-   Last block also is a default value for start block and end block, in order to ease most searches with less digits to type and reduce mistakes
    (ex: for searches about events from the last 10 blocks)

-   Default values are also shown as placeholders for the following use case:
    When I change an input, I want to be able to change it back to its default value

# About performance

Requirements followed:

-   I can fetch events over 500 blocks
-   I can start fetching events from the whole chain without the app crashing

This was achieved by proper Promises chaining (asynchronously building and launching promises)

# Development

## Notes about issues

### Ignorable issues with react-bootstrap-table-next

react-bootstrap-table-next is used for table displaying, sorting, and column expanding.
It works fine, but creates a warning with React strict mode.
This warning can be safely ignored.

### Solved issues with Jest

Errors when tring to run tests with Jest were fixed by:

-   installing jest-watch-typeahead
    (see https://stackoverflow.com/a/70400744/14766155)

-   changing the config (see https://github.com/polkadot-js/api/issues/4233#issuecomment-984956245)

## Setup

### Install dependencies

In the project directory, run:

`npm i --legacy-peer-deps`

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more details.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more details.

## polkadot{.js} documentation

See [polkadot{.js} "Getting started" guide](https://polkadot.js.org/docs/api/start)

# Deployment

The deployment uses Github Pages.

For this project, deployment was set up following [this guide](https://github.com/gitname/react-gh-pages).

## Deploy

First install dependencies:

`npm i --legacy-peer-deps`

Then deploy (requires access to the repository):

`npm run deploy`
