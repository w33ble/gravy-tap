# gravy-tap

Tap runner for Sauce Labs.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/w33ble/gravy-tap/master/LICENSE)
[![Build Status](https://img.shields.io/travis/w33ble/gravy-tap.svg?branch=master)](https://travis-ci.org/w33ble/gravy-tap)
[![npm](https://img.shields.io/npm/v/gravy-tap.svg)](https://www.npmjs.com/package/gravy-tap)
[![Project Status](https://img.shields.io/badge/status-experimental-orange.svg)](https://nodejs.org/api/documentation.html#documentation_stability_index)

## Usage

```js
import gravyTap from 'gravy-tap';

gravyTap(src)
  .then(results => {
    // results include information about the parsed tap output

    // results.output: Full tap output
    // results.tests: Number of tests executed
    // results.passed: Number of tests that passed
    // results.failed: Number of tests that failed
    // results.errors: An array of all the failed tests, as object
    //   failure objects have 2 properties, 
    //     line: the failing line's summary
    //     details: the entire failure message
  })
  .catch(err => {
    // if the code lands here, there were probably uncaught errors in the code
    // sent to the sauce labs runner
  });
```

#### License

MIT © [w33ble](https://github.com/w33ble)

#### Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)

[![Testing Provided by Sauce Labs](sauce.png)](https://saucelabs.com/)