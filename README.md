# gravy-tap

Tap runner for Sauce Labs.

![](logo.png)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/w33ble/gravy-tap/master/LICENSE)
[![Build Status](https://img.shields.io/travis/w33ble/gravy-tap.svg?branch=master)](https://travis-ci.org/w33ble/gravy-tap)
[![npm](https://img.shields.io/npm/v/gravy-tap.svg)](https://www.npmjs.com/package/gravy-tap)
[![Project Status](https://img.shields.io/badge/status-experimental-orange.svg)](https://nodejs.org/api/documentation.html#documentation_stability_index)

## Usage

`gravyTap` works by taking raw, tap-producing javascript code as a string, running it in real browser via SauceLabs, and providing a summary of the results.

```js
import gravyTap from 'gravy-tap';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const src = readFileSync(resolve(__dirname, 'test/bundle.js'));

gravyTap(src)
  .then(results => {
    // results include information about the parsed tap output
    // see below for explanation
  })
  .catch(err => {
    // if the code lands here, there were probably uncaught errors in the code
    // sent to the sauce labs runner
  });
```

## API

### `gravyTap(src, [options])`

`src` is your raw, tap-producing javascript code, read from a file or otherwise passed in as a string. `options` is an object, described below.

### Options

`gravyTap` also takes a second parameter that is an object of options. The available options are:

Option | Default | Description
- | - | -
rejectOnErrors | true | If there are errors in the tap output, reject the promise
capabilities | | An object of [SauceLabs capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)
sauce | | The SauceLabs `user` and `key` values, as an object (`{ user: '...', key: '...' }`); can also be set using `SAUCE_USER` and `SAUCE_KEY` environment variables

### Results

The `results` object can be used to check the results of the test run.

Property | Description
- | -
results.output | Full tap output produced by `src`
results.tests | Number of tests executed
results.passed | Number of tests that passed
results.failed | Number of tests that failed
results.errors | An array of all the failed tests, as objects (see below)

This library uses [simple-tap-parser](https://www.npmjs.com/package/simple-tap-parser) to parse the tap output, see that module for more information.

The objects inside the `results.errors` array have the following properties:

Property | Description
- | -
line | The failing line's summary
details | The entire failure message

#### License

MIT © [w33ble](https://github.com/w33ble)

#### Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)

[![Testing Provided by Sauce Labs](sauce.png)](https://saucelabs.com/)